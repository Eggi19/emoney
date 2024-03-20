CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR NOT NULL,
    UNIQUE(email),
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    profile_image VARCHAR,
    password VARCHAR NOT NULL,
    balance INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP
);

INSERT INTO users (email, first_name, last_name, password) VALUES
    ('user1@gmail.com', 'user1', 'user1', '$2a$10$1tK.PDwNRquPMDgzi.52TeDYoGNZ0qb7xec4FMqGJbXAbYCnLJLtu'),
    ('user2@gmail.com', 'user2', 'user1', '$2a$10$1tK.PDwNRquPMDgzi.52TeDYoGNZ0qb7xec4FMqGJbXAbYCnLJLtu'),
    ('user3@gmail.com', 'user3', 'user1', '$2a$10$1tK.PDwNRquPMDgzi.52TeDYoGNZ0qb7xec4FMqGJbXAbYCnLJLtu'),
    ('user4@gmail.com', 'user4', 'user1', '$2a$10$1tK.PDwNRquPMDgzi.52TeDYoGNZ0qb7xec4FMqGJbXAbYCnLJLtu'),
    ('user5@gmail.com', 'user5', 'user1', '$2a$10$1tK.PDwNRquPMDgzi.52TeDYoGNZ0qb7xec4FMqGJbXAbYCnLJLtu');	

CREATE TABLE banners (
    id BIGSERIAL PRIMARY KEY,
    banner_name VARCHAR NOT NULL,
    banner_image VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP
);

INSERT INTO banners (banner_name, banner_image, description) VALUES
    ('Banner 1', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
    ('Banner 2', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
    ('Banner 3', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
    ('Banner 4', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
    ('Banner 5', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
    ('Banner 6', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
    ('Banner 7', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet');

CREATE TABLE services (
    id BIGSERIAL PRIMARY KEY,
    service_code VARCHAR NOT NULL,
    service_name VARCHAR NOT NULL,
    service_icon VARCHAR NOT NULL,
    service_tarif INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP
);

INSERT INTO services (service_code, service_name, service_icon, service_tarif) VALUES
    ('PAJAK', 'Pajak PBB', 'https://nutech-integrasi.app/dummy.jpg', 40000),
    ('PLN', 'Listrik', 'https://nutech-integrasi.app/dummy.jpg', 10000),
    ('PDAM', 'PDAM Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 40000),
    ('PULSA', 'Pulsa', 'https://nutech-integrasi.app/dummy.jpg', 40000),
    ('PGN', 'PGN Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000),
    ('MUSIK', 'Musik Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000),
    ('TV', 'TV Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000),
    ('VOUCHER_GAME', 'Voucher Game', 'https://nutech-integrasi.app/dummy.jpg', 100000),
    ('VOUCHER_MAKANAN', 'Voucher Makanan', 'https://nutech-integrasi.app/dummy.jpg', 100000),
    ('QURBAN', 'Qurban', 'https://nutech-integrasi.app/dummy.jpg', 200000),
    ('ZAKAT', 'Zakat', 'https://nutech-integrasi.app/dummy.jpg', 300000);

CREATE TABLE transactions (
    id BIGSERIAL PRIMARY KEY,
    invoice_number VARCHAR NOT NULL,
    transaction_type  VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    total_amount INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    user_email BIGINT NOT NULL,
    FOREIGN KEY (user_email) REFERENCES users(email)
);