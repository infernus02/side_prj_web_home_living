package com.project.homeliving.service.imp.treatment;

import com.project.homeliving.dto.treatment.ProductRequest;
import com.project.homeliving.dto.treatment.ProductResponse;
import com.project.homeliving.dto.treatment.ProductSearch;
import com.project.homeliving.entity.product.Category;
import com.project.homeliving.entity.product.Product;
import com.project.homeliving.exception.AppException;
import com.project.homeliving.exception.ErrorCode;
import com.project.homeliving.mapper.ProductMapper;
import com.project.homeliving.repository.product.IProductRepository;
import com.project.homeliving.service.interfaces.treatment.IProductService;
import com.project.homeliving.util.FileUtils;
import com.project.homeliving.util.ObjectMapperUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService implements IProductService {
    private final IProductRepository productRepository;
    private final ProductMapper productMapper;

    @Override
    public Product findById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        if(Boolean.TRUE.equals(product.getIsDelete()))
            throw new AppException(ErrorCode.CATEGORY_NOT_FOUND);
        return product;
    }

    @Override
    public ProductResponse detail(Long id) {
        var entity = this.findById(id);
        return productMapper.toResponse(entity);
    }

    @Override
    public Page<ProductResponse> search(ProductSearch search) {
        Pageable pageable = PageRequest.of(search.getPage() - 1,
                search.getLimit());

        Page<ProductResponse> responses = productRepository.search(search.getKeyword(),
                        search.getCategoryId(), pageable)
                .map(it -> productMapper.toResponse(it));

        return responses;
    }

    @Override
    public ProductResponse create(ProductRequest request) {
        Product product = ObjectMapperUtils.map(request, Product.class);

        if(request.getImage() != null && !request.getImage().isEmpty()){
            String avatar = FileUtils.saveFileWithCustomDir(request.getImage());
            product.setImage(avatar);
        }
        product.setCategory(new Category(request.getCategoryId()));

        return ObjectMapperUtils.map(productRepository.save(product), ProductResponse.class);
    }

    @Override
    public ProductResponse update(Long id, ProductRequest request) {
        Product product = this.findById(id);

        if(request.getImage() != null && !request.getImage().isEmpty()){
            String avatar = FileUtils.saveFileWithCustomDir(request.getImage());
            product.setImage(avatar);
        }
        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setQuantity(request.getQuantity());
        product.setSupplier(request.getSupplier());

        return ObjectMapperUtils.map(productRepository.save(product), ProductResponse.class);
    }

    @Override
    public void delete(Long id) {
        Product product = this.findById(id);

        // Validate: Không thể xóa product nếu còn có dữ liệu liên quan
        if (productRepository.hasActiveOrderDetails(id)) {
            throw new AppException(ErrorCode.CANNOT_DELETE_PRODUCT_HAS_ORDER_DETAILS);
        }

        if (productRepository.hasActiveFeedbacks(id)) {
            throw new AppException(ErrorCode.CANNOT_DELETE_PRODUCT_HAS_FEEDBACKS);
        }

        product.setIsDelete(true);
        productRepository.save(product);
    }
}
