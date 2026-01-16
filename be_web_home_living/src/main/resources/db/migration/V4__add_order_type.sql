-- Thêm cột type vào bảng tbl_order
ALTER TABLE tbl_order ADD COLUMN IF NOT EXISTS type VARCHAR(20);

-- Set default value cho các order hiện tại
-- Nếu có treatment thì là TREATMENT, nếu không thì là PRODUCT
UPDATE tbl_order 
SET type = CASE 
    WHEN treatment_id IS NOT NULL THEN 'TREATMENT'
    ELSE 'PRODUCT'
END
WHERE type IS NULL;

-- Thêm constraint để đảm bảo type chỉ có thể là PRODUCT hoặc TREATMENT
ALTER TABLE tbl_order ADD CONSTRAINT chk_order_type 
CHECK (type IN ('PRODUCT', 'TREATMENT'));

-- Thêm constraint để đảm bảo logic nghiệp vụ:
-- - PRODUCT order: phải có orderDetails, không có treatment
-- - TREATMENT order: phải có treatment, không có orderDetails
-- Note: Constraint này sẽ được enforce ở application level vì phức tạp để implement ở DB level

-- Thêm index cho performance
CREATE INDEX IF NOT EXISTS idx_order_type ON tbl_order(type);
CREATE INDEX IF NOT EXISTS idx_order_type_status ON tbl_order(type, payment_status);
