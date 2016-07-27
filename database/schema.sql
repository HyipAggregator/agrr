CREATE TABLE hyips (
    id VARCHAR(36) PRIMARY KEY,
    monitor_id VARCHAR(20) NOT NULL,
    name VARCHAR(500),
    url VARCHAR(500),
    plans VARCHAR(500),
    banner_code TEXT,
)