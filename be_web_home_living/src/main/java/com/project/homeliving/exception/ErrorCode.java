package com.project.homeliving.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(-1, "Lỗi không xác định"),
    UNAUTHEN(401, "Chưa đăng nhập"),
    FORBIDDEN(403, "Không có quyền truy cập"),

    //---user exception
    USER_NOT_FOUND(400, "Không tìm thấy user"),
    USERNAME_WAS_REGISTER(400, "Tên đăng nhập đã được sử dụng"),

    CUSTOMER_NOT_FOUND(400, "Không tìm thấy thông tin user"),

    PASSWORD_NOT_NULL(400, "Mật khẩu không được để trống!"),
    PASSWORD_NOT_MATCH(400, "Mật khẩu cũ không đúng"),

    //---role exception
    ROLE_NOT_FOUND(400, "Vai trò không tồn tại!"),
    ROLE_NOT_NULL(400, "Vai trò không được để trống"),

    MAIL_CONFIG_MISSING(400, "Lỗi cấu hình email"),
    MAIL_SENDING_FAILED(400, "Gửi email thất bại"),

    TOKEN_RESET_PASS_NOT_FOUND(400, "Link không hợp lệ"),
    TOKEN_EXPIRED(400, "Link hết hạn"),


    CATEGORY_NOT_FOUND(400, "Danh mục không tồn tại"),
    PRODUCT_NOT_FOUND(400, "Sản phẩm không tồn tại"),
    FEEDBACK_NOT_FOUND(400, "Phản hồi không tồn tại"),
    FEEDBACK_ALREADY_EXISTS(400, "Bạn đã đánh giá sản phẩm/dịch vụ này rồi"),
    ORDER_NOT_FOUND(400, "Order không tồn tại"),
    INVALID_REQUEST(400, "Yêu cầu không hợp lệ"),

    // Validation errors for delete operations
    CANNOT_DELETE_CATEGORY_HAS_PRODUCTS(400, "Không thể xóa danh mục vì còn có sản phẩm liên quan"),
    OUT_OF_STOCK(400, "Hết hàng"),
    CANNOT_DELETE_PRODUCT_HAS_ORDER_DETAILS(400, "Không thể xóa sản phẩm vì còn có đơn hàng liên quan"),
    CANNOT_DELETE_PRODUCT_HAS_FEEDBACKS(400, "Không thể xóa sản phẩm vì còn có đánh giá liên quan"),
    CANNOT_DELETE_CUSTOMER_HAS_ORDERS(400, "Không thể xóa khách hàng vì còn có đơn hàng liên quan"),
    CANNOT_DELETE_CUSTOMER_HAS_FEEDBACKS(400, "Không thể xóa khách hàng vì còn có đánh giá liên quan"),
    CANNOT_DELETE_ORDER_HAS_FEEDBACKS(400, "Không thể xóa đơn hàng vì còn có đánh giá liên quan"),
    CANNOT_DELETE_FEEDBACK_HAS_REPLIES(400, "Không thể xóa đánh giá vì còn có phản hồi từ nhân viên"),
    ;

    private int code;
    private String message;
}
