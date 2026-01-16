-- Migration V3: Update feedback system to support staff replies and product feedback

-- Thêm các cột mới vào bảng tbl_feedback
ALTER TABLE tbl_feedback ADD COLUMN IF NOT EXISTS feedback_type VARCHAR(20) DEFAULT 'CUSTOMER';
ALTER TABLE tbl_feedback ADD COLUMN IF NOT EXISTS staff_id BIGINT;
ALTER TABLE tbl_feedback ADD COLUMN IF NOT EXISTS parent_feedback_id BIGINT;
ALTER TABLE tbl_feedback ADD COLUMN IF NOT EXISTS product_id BIGINT;

-- Thêm foreign key constraints
ALTER TABLE tbl_feedback ADD CONSTRAINT fk_feedback_staff 
    FOREIGN KEY (staff_id) REFERENCES tbl_staff(id);

ALTER TABLE tbl_feedback ADD CONSTRAINT fk_feedback_parent 
    FOREIGN KEY (parent_feedback_id) REFERENCES tbl_feedback(id);

ALTER TABLE tbl_feedback ADD CONSTRAINT fk_feedback_product 
    FOREIGN KEY (product_id) REFERENCES tbl_product(id);

-- Cập nhật dữ liệu cũ: tất cả feedback hiện tại là của Customer
UPDATE tbl_feedback SET feedback_type = 'CUSTOMER' WHERE feedback_type IS NULL;

-- Tạo index để tối ưu performance
CREATE INDEX IF NOT EXISTS idx_feedback_type ON tbl_feedback(feedback_type);
CREATE INDEX IF NOT EXISTS idx_feedback_staff_id ON tbl_feedback(staff_id);
CREATE INDEX IF NOT EXISTS idx_feedback_parent_id ON tbl_feedback(parent_feedback_id);
CREATE INDEX IF NOT EXISTS idx_feedback_product_id ON tbl_feedback(product_id);
CREATE INDEX IF NOT EXISTS idx_feedback_customer_treatment ON tbl_feedback(customer_id, treatment_id);
CREATE INDEX IF NOT EXISTS idx_feedback_customer_product ON tbl_feedback(customer_id, product_id);

-- Thêm constraint để đảm bảo Customer chỉ feedback 1 lần cho mỗi Treatment
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_customer_treatment_feedback 
ON tbl_feedback(customer_id, treatment_id) 
WHERE feedback_type = 'CUSTOMER' AND treatment_id IS NOT NULL AND is_delete = false;

-- Thêm constraint để đảm bảo Customer chỉ feedback 1 lần cho mỗi Product  
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_customer_product_feedback 
ON tbl_feedback(customer_id, product_id) 
WHERE feedback_type = 'CUSTOMER' AND product_id IS NOT NULL AND is_delete = false;

-- Thêm check constraint để đảm bảo logic nghiệp vụ
ALTER TABLE tbl_feedback ADD CONSTRAINT chk_feedback_logic CHECK (
    -- Customer feedback phải có customer_id và (treatment_id hoặc product_id)
    (feedback_type = 'CUSTOMER' AND customer_id IS NOT NULL AND (treatment_id IS NOT NULL OR product_id IS NOT NULL) AND staff_id IS NULL AND parent_feedback_id IS NULL)
    OR
    -- Staff reply phải có staff_id và parent_feedback_id
    (feedback_type = 'STAFF_REPLY' AND staff_id IS NOT NULL AND parent_feedback_id IS NOT NULL AND customer_id IS NULL AND rating IS NULL)
);
