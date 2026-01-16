-- Migration V5: Create chat message table for chatbot

-- Tao bang tbl_chat_message
CREATE TABLE IF NOT EXISTS tbl_chat_message (
    id BIGSERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    response TEXT,
    sender_type VARCHAR(20) DEFAULT 'USER',
    account_id BIGINT NOT NULL,
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    create_by VARCHAR(255),
    update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_by VARCHAR(255),
    is_delete BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (account_id) REFERENCES tbl_account(id)
);

-- Tao index de toi uu performance
CREATE INDEX IF NOT EXISTS idx_chat_message_account_id ON tbl_chat_message(account_id);
CREATE INDEX IF NOT EXISTS idx_chat_message_create_date ON tbl_chat_message(create_date DESC);
CREATE INDEX IF NOT EXISTS idx_chat_message_account_date ON tbl_chat_message(account_id, create_date DESC);

-- Them constraint cho sender_type
ALTER TABLE tbl_chat_message ADD CONSTRAINT chk_sender_type 
CHECK (sender_type IN ('USER', 'BOT'));

