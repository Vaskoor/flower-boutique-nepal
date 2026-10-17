
CREATE TABLE users (id SERIAL PRIMARY KEY, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, name TEXT, phone TEXT, address TEXT, created_at TIMESTAMP DEFAULT NOW());
CREATE TABLE categories (id SERIAL PRIMARY KEY, name TEXT NOT NULL, slug TEXT UNIQUE, description TEXT);
CREATE TABLE products (id SERIAL PRIMARY KEY, category_id INT REFERENCES categories(id), name TEXT NOT NULL, description TEXT, price DECIMAL(10,2) NOT NULL, image TEXT, stock INT DEFAULT 0, created_at TIMESTAMP DEFAULT NOW());
CREATE TABLE orders (id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id), total DECIMAL(15,2), status TEXT DEFAULT 'pending', shipping_address TEXT, created_at TIMESTAMP DEFAULT NOW());
CREATE TABLE order_items (id SERIAL PRIMARY KEY, order_id INT REFERENCES orders(id) ON DELETE CASCADE, product_id INT REFERENCES products(id), quantity INT NOT NULL, price DECIMAL(10,2), created_at TIMESTAMP DEFAULT NOW());
CREATE TABLE cart (id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id), product_id INT REFERENCES products(id), quantity INT, created_at TIMESTAMP DEFAULT NOW());
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_orders_user ON orders(user_id);
