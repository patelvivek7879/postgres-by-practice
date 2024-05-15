CREATE TABLE progress (
    user_email VARCHAR(255) PRIMARY KEY,
    qryngdt INTEGER,
    fltrngdt INTEGER,
    jns INTEGER,
    grpngdt INTEGER,
    sbqry INTEGER,
    mdfyngdt INTEGER,
    transactions INTEGER,
    mngngtblcol INTEGER,
    psqlcntrnts INTEGER,
    dttyps INTEGER,
    FOREIGN KEY (user_email) REFERENCES users(email)
);