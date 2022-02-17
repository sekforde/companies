DROP TABLE IF EXISTS company;
CREATE TABLE company (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,  
    name        TEXT,
    number      TEXT UNIQUE,
    status      TEXT,
    type        TEXT,
    creationDate    DATE,
    cessationDate   DATE,
    address1    TEXT,
    address2    TEXT,
    locality    TEXT,
    postcode    TEXT,
    country     TEXT
);
