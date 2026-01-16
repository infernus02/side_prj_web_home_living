package com.project.homeliving.service.imp.order;

import com.project.homeliving.dto.order.OrderDetailRequest;
import com.project.homeliving.dto.order.ProductOrderRequest;
import com.project.homeliving.dto.order.ProductOrderResponse;
import com.project.homeliving.dto.order.OrderSearch;
import com.project.homeliving.dto.user.response.UserResponse;
import com.project.homeliving.entity.order.Order;
import com.project.homeliving.entity.order.OrderDetail;
import com.project.homeliving.entity.product.Product;
import com.project.homeliving.entity.user.User;
import com.project.homeliving.exception.AppException;
import com.project.homeliving.exception.ErrorCode;
import com.project.homeliving.mapper.ProductOrderMapper;
import com.project.homeliving.repository.feedback.IFeedbackRepository;
import com.project.homeliving.repository.order.IOrderDetailRepository;
import com.project.homeliving.repository.order.IOrderRepository;
import com.project.homeliving.repository.product.IProductRepository;
import com.project.homeliving.service.interfaces.order.IProductOrderService;
import com.project.homeliving.service.interfaces.user.IAuthenService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ProductOrderService implements IProductOrderService {
    private final IOrderRepository orderRepository;
    private final IOrderDetailRepository orderDetailRepository;
    private final IProductRepository productRepository;
    private final IFeedbackRepository feedbackRepository;
    private final ProductOrderMapper productOrderMapper;
    private final IAuthenService authenService;

    @Override
    public ProductOrderResponse detail(Long id) {
        Order order = findById(id);
        if (!"PRODUCT".equals(order.getType())) {
            throw new AppException(ErrorCode.INVALID_REQUEST);
        }
        return productOrderMapper.toResponse(order);
    }

    @Override
    public Page<ProductOrderResponse> search(OrderSearch search, Boolean searchMine) {
        UserResponse userResponse = new UserResponse();
        if(searchMine == true)
            userResponse = null;

        Pageable pageable = PageRequest.of(search.getPage() - 1, search.getLimit());
        
        // Chỉ tìm orders có type = "PRODUCT"
        Page<Order> orders = orderRepository.searchByType(
                search.getKeyword(),
                "PRODUCT",
                search.getPaymentType(),
                userResponse.getId(),
                pageable
        );
        
        return orders.map(productOrderMapper::toResponse);
    }

    @Override
    public ProductOrderResponse create(ProductOrderRequest request) {
        // Validate: Phải có ít nhất 1 sản phẩm
        if (request.getOrderDetails() == null || request.getOrderDetails().isEmpty()) {
            throw new AppException(ErrorCode.INVALID_REQUEST);
        }

        UserResponse userResponse = null;

        // Tạo Order
        Order order = Order.builder()
                .type("PRODUCT")
                .discount(request.getDiscount())
                .paymentType(request.getPaymentType())
                .paymentStatus("PAID")  // Mặc định PAID cho demo sinh viên
                .orderTime(request.getOrderTime())
                .user(new User(userResponse.getId()))
                .build();

        // Tính tổng tiền từ OrderDetails
        Double totalAmount = calculateTotalAmount(request);
        order.setTotalAmount(totalAmount);

        // Lưu Order trước
        Order savedOrder = orderRepository.save(order);

        // Tạo OrderDetails
        List<OrderDetail> orderDetails = createOrderDetails(savedOrder, request.getOrderDetails());
        savedOrder.setOrderDetails(orderDetails);

        return productOrderMapper.toResponse(savedOrder);
    }

    @Override
    public ProductOrderResponse update(Long id, ProductOrderRequest request) {
        Order order = findById(id);
        if (!"PRODUCT".equals(order.getType())) {
            throw new AppException(ErrorCode.INVALID_REQUEST);
        }

        // Validate: Phải có ít nhất 1 sản phẩm
        if (request.getOrderDetails() == null || request.getOrderDetails().isEmpty()) {
            throw new AppException(ErrorCode.INVALID_REQUEST);
        }

        // Update order fields
        order.setDiscount(request.getDiscount());
        order.setPaymentType(request.getPaymentType());
        order.setPaymentStatus("PAID");  // Mặc định PAID cho demo sinh viên
        order.setOrderTime(request.getOrderTime());
        order.setUser(new User(request.getCustomerId()));

        // Tính lại tổng tiền
        Double totalAmount = calculateTotalAmount(request);
        order.setTotalAmount(totalAmount);

        // Xóa OrderDetails cũ và tạo mới
        orderDetailRepository.deleteByOrderId(order.getId());
        List<OrderDetail> orderDetails = createOrderDetails(order, request.getOrderDetails());
        order.setOrderDetails(orderDetails);

        Order savedOrder = orderRepository.save(order);
        return productOrderMapper.toResponse(savedOrder);
    }

    @Override
    public void delete(Long id) {
        Order order = findById(id);
        if (!"PRODUCT".equals(order.getType())) {
            throw new AppException(ErrorCode.INVALID_REQUEST);
        }

        order.setIsDelete(true);
        orderRepository.save(order);
    }

    private Order findById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        if (Boolean.TRUE.equals(order.getIsDelete())) {
            throw new AppException(ErrorCode.ORDER_NOT_FOUND);
        }
        return order;
    }

    private Double calculateTotalAmount(ProductOrderRequest request) {
        Double total = 0.0;

        // Tính tiền từ orderDetails
        for (OrderDetailRequest detail : request.getOrderDetails()) {
            Product product = productRepository.findById(detail.getProductId())
                    .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

            Double unitPrice = detail.getUnitPrice() != null ? detail.getUnitPrice() : product.getPrice();
            total += unitPrice * detail.getQuantity();
        }

        // Trừ discount
        if (request.getDiscount() != null) {
            total -= request.getDiscount();
        }

        return Math.max(total, 0.0); // Không cho âm
    }

    private List<OrderDetail> createOrderDetails(Order order, List<OrderDetailRequest> detailRequests) {
        List<OrderDetail> orderDetails = new ArrayList<>();

        for (OrderDetailRequest detailRequest : detailRequests) {
            Product product = productRepository.findById(detailRequest.getProductId())
                    .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

            Double unitPrice = detailRequest.getUnitPrice() != null ? 
                    detailRequest.getUnitPrice() : product.getPrice();
            Double totalPrice = unitPrice * detailRequest.getQuantity();

            OrderDetail orderDetail = OrderDetail.builder()
                    .order(order)
                    .product(product)
                    .quantity(detailRequest.getQuantity())
                    .unitPrice(unitPrice)
                    .totalPrice(totalPrice)
                    .build();

            product.setQuantity(product.getQuantity() - detailRequest.getQuantity());
            if(product.getQuantity() < 0)
                throw new AppException(ErrorCode.OUT_OF_STOCK);
            productRepository.save(product);

            orderDetailRepository.save(orderDetail);
            orderDetails.add(orderDetail);
        }

        return orderDetails;
    }
}
