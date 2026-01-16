-- Migration script: Chuyển từ Order.product_id sang OrderDetail
-- Tạo bảng OrderDetail
CREATE TABLE IF NOT EXISTS tbl_order_detail (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(15,2) NOT NULL,
    total_price DECIMAL(15,2) NOT NULL,
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_delete BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (order_id) REFERENCES tbl_order(id),
    FOREIGN KEY (product_id) REFERENCES tbl_product(id)
);

-- Migrate data từ tbl_order sang tbl_order_detail
INSERT INTO tbl_order_detail (order_id, product_id, quantity, unit_price, total_price, create_date, update_date, is_delete)
SELECT 
    o.id as order_id,
    o.product_id,
    1 as quantity,  -- Mặc định quantity = 1
    COALESCE(p.price, 0) as unit_price,
    COALESCE(p.price, 0) as total_price,
    o.create_date,
    o.update_date,
    o.is_delete
FROM tbl_order o
INNER JOIN tbl_product p ON o.product_id = p.id
WHERE o.product_id IS NOT NULL 
    AND o.is_delete = FALSE;

-- Thêm cột total_amount vào tbl_order và update từ price
ALTER TABLE tbl_order ADD COLUMN IF NOT EXISTS total_amount DECIMAL(15,2);

-- Update total_amount = price (tạm thời)
UPDATE tbl_order SET total_amount = COALESCE(price, 0) WHERE total_amount IS NULL;

-- Xóa cột product_id khỏi tbl_order (comment out để tránh mất data)
-- ALTER TABLE tbl_order DROP COLUMN IF EXISTS product_id;

-- Tạo index cho performance
CREATE INDEX IF NOT EXISTS idx_order_detail_order_id ON tbl_order_detail(order_id);
CREATE INDEX IF NOT EXISTS idx_order_detail_product_id ON tbl_order_detail(product_id);
