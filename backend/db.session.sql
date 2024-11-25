-- -- Create auth_group table
-- CREATE TABLE auth_group (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(80) NOT NULL
-- );

-- -- Insert data into auth_group table
-- INSERT INTO auth_group (id, name) VALUES (1, 'Administrators');

-- -- Create auth_permission table
-- CREATE TABLE auth_permission (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     content_type_id INTEGER NOT NULL,
--     codename VARCHAR(100) NOT NULL
-- );

-- -- Insert data into auth_permission table
-- INSERT INTO auth_permission (id, name, content_type_id, codename) 
-- VALUES (1, 'Can add product', 1, 'add_product');

-- -- Create auth_group_permissions table
-- CREATE TABLE auth_group_permissions (
--     id SERIAL PRIMARY KEY,
--     group_id INTEGER NOT NULL,
--     permission_id INTEGER NOT NULL
-- );

-- -- Insert data into auth_group_permissions table
-- INSERT INTO auth_group_permissions (id, group_id, permission_id) 
-- VALUES (1, 1, 1);

-- -- Create auth_user table
-- CREATE TABLE auth_user (
--     id SERIAL PRIMARY KEY,
--     password VARCHAR(128) NOT NULL,
--     last_login TIMESTAMP,
--     is_superuser BOOLEAN NOT NULL,
--     username VARCHAR(150) NOT NULL,
--     first_name VARCHAR(30) NOT NULL,
--     last_name VARCHAR(150) NOT NULL,
--     email VARCHAR(254) NOT NULL,
--     is_staff BOOLEAN NOT NULL,
--     is_active BOOLEAN NOT NULL,
--     date_joined TIMESTAMP NOT NULL
-- );

-- -- Insert data into auth_user table
-- INSERT INTO auth_user (
--     id, password, last_login, is_superuser, username, first_name, 
--     last_name, email, is_staff, is_active, date_joined
-- ) 
-- VALUES (
--     1, 'pbkdf2_sha256$870000$UYcB6rQMO8fID8b3obkXiL$ChHps2KI8e07EOjnlVg8O3PKQPOJtI7LSOVVx7ejTos=', '2024-11-25 10:00:00', true, 'boss', 'Vasya', 
--     'User', 'admin@example.com', true, true, '2024-01-01 08:00:00'
-- );

-- INSERT INTO auth_group (id, name)
-- VALUES (1, 'admin'), (2, 'user');

-- -- Insert into auth_group_permissions
-- INSERT INTO auth_group_permissions (id, group_id, permission_id)
-- VALUES (1, 1, 1), (2, 2, 2);

-- -- Insert into auth_user_groups
-- INSERT INTO auth_user_groups (id, user_id, group_id)
-- VALUES (1, 1, 1);

-- -- Create auth_user_groups table
-- CREATE TABLE auth_user_groups (
--     id SERIAL PRIMARY KEY,
--     user_id INTEGER NOT NULL,
--     group_id INTEGER NOT NULL
-- );

-- -- Insert data into auth_user_groups table
-- INSERT INTO auth_user_groups (id, user_id, group_id) 
-- VALUES (1, 1, 1);

-- -- Create auth_user_user_permissions table
-- CREATE TABLE auth_user_user_permissions (
--     id SERIAL PRIMARY KEY,
--     user_id INTEGER NOT NULL,
--     permission_id INTEGER NOT NULL
-- );

-- -- Insert data into auth_user_user_permissions table
-- INSERT INTO auth_user_user_permissions (id, user_id, permission_id) 
-- VALUES (1, 1, 1);

-- -- Create authtoken_token table
-- CREATE TABLE authtoken_token (
--     "key" VARCHAR(40) PRIMARY KEY,
--     created TIMESTAMP NOT NULL,
--     user_id INTEGER NOT NULL
-- );

-- -- Insert data into authtoken_token table
-- INSERT INTO authtoken_token ("key", created, user_id) 
-- VALUES ('abcd1234', '2024-11-25 10:00:00', 1);

-- -- Create shop_category table
-- CREATE TABLE shop_category (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     slug VARCHAR(255) NOT NULL,
--     image VARCHAR(255),
--     parent_id INTEGER
-- );

-- -- Insert data into shop_category table
-- INSERT INTO shop_category (id, name, slug, image, parent_id) VALUES 
-- (1, 'Electronics', 'electronics', 'image1.jpg', NULL),
-- (2, 'Clothing', 'clothing', 'image2.jpg', NULL),
-- (3, 'Books', 'books', 'image3.jpg', NULL),
-- (4, 'Home Appliances', 'home-appliances', 'image4.jpg', NULL),
-- (5, 'Toys', 'toys', 'image5.jpg', NULL);

-- -- Create shop_product table
-- CREATE TABLE shop_product (
--     id SERIAL PRIMARY KEY,
--     title VARCHAR(255) NOT NULL,
--     description TEXT NOT NULL,
--     price DECIMAL(10, 2) NOT NULL,
--     stock INTEGER NOT NULL,
--     image VARCHAR(255),
--     category_id INTEGER NOT NULL,
--     entrepreneur_id INTEGER NOT NULL,
--     user_id INTEGER NOT NULL
-- );

-- -- Create shop_order table
-- CREATE TABLE shop_order (
--     id SERIAL PRIMARY KEY,
--     address VARCHAR(255),
--     city VARCHAR(100),
--     zip_code VARCHAR(10),
--     total_price DECIMAL(10, 2),
--     created_at TIMESTAMP,
--     updated_at TIMESTAMP,
--     user_id INTEGER NOT NULL
-- );

-- -- Create shop_orderproduct table
-- CREATE TABLE shop_orderproduct (
--     id SERIAL PRIMARY KEY,
--     quantity INTEGER NOT NULL,
--     price DECIMAL(10, 2) NOT NULL,
--     order_id INTEGER NOT NULL,
--     product_id INTEGER NOT NULL
-- );

-- -- Create shop_rating table
-- CREATE TABLE shop_rating (
--     id SERIAL PRIMARY KEY,
--     title VARCHAR(255) NOT NULL,
--     text TEXT NOT NULL,
--     rating INTEGER NOT NULL,
--     product_id INTEGER NOT NULL,
--     user_id INTEGER NOT NULL
-- );

-- -- Таблица shop_order
-- INSERT INTO shop_order (id, address, city, zip_code, total_price, created_at, updated_at, user_id) 
-- VALUES (1, '123 Main Street', 'New York', '10001', 349.95, '2024-11-20 14:00:00', '2024-11-20 14:00:00', 1);

-- -- Таблица shop_orderproduct
-- INSERT INTO shop_orderproduct (id, quantity, price, order_id, product_id) 
-- VALUES (1, 1, 699.99, 1, 1);

-- -- Таблица shop_rating
-- INSERT INTO shop_rating (id, title, text, rating, product_id, user_id) 
-- VALUES (1, 'Great product!', 'Loved it, very high quality.', 5, 1, 1);

-- INSERT INTO shop_product (
--     title,
--     description,
--     price,
--     stock,
--     image,
--     category_id,
--     entrepreneur_id,
--     user_id
-- ) VALUES
--     ('Smartphone', 'Latest model smartphone', 699.99, 50, 'smartphone.jpg', 1, 0, 2),
--     ('Laptop', 'High-performance laptop', 999.99, 30, 'laptop.jpg', 1, 0, 2),
--     ('Headphones', 'Noise-cancelling headphones', 199.99, 100, 'headphones.jpg', 1, 0, 2),
--     ('Smartwatch', 'Fitness tracking smartwatch', 149.99, 200, 'smartwatch.jpg', 1, 0, 2),
--     ('Tablet', 'Lightweight and powerful tablet', 499.99, 40, 'tablet.jpg', 1, 0, 2),
--     ('T-Shirt', '100% cotton t-shirt', 19.99, 300, 'tshirt.jpg', 2, 0, 2),
--     ('Jeans', 'Slim-fit jeans', 49.99, 150, 'jeans.jpg', 2, 0, 2),
--     ('Jacket', 'Waterproof jacket', 99.99, 75, 'jacket.jpg', 2, 0, 2),
--     ('Sneakers', 'Comfortable sneakers', 69.99, 200, 'sneakers.jpg', 2, 0, 2),
--     ('Cap', 'Adjustable cap', 14.99, 250, 'cap.jpg', 2, 0, 2),
--     ('Novel', 'Best-selling novel', 12.99, 500, 'novel.jpg', 3, 0, 2),
--     ('Textbook', 'University textbook', 89.99, 50, 'textbook.jpg', 3, 0, 2),
--     ('Comic Book', 'Superhero comic book', 5.99, 300, 'comicbook.jpg', 3, 0, 2),
--     ('Cookbook', 'Recipes from around the world', 24.99, 100, 'cookbook.jpg', 3, 0, 2),
--     ('Biography', 'Famous person biography', 14.99, 200, 'biography.jpg', 3, 0, 2),
--     ('Vacuum Cleaner', 'High-power vacuum cleaner', 149.99, 50, 'vacuum.jpg', 4, 0, 2),
--     ('Air Fryer', 'Oil-free air fryer', 99.99, 100, 'airfryer.jpg', 4, 0, 2),
--     ('Microwave', 'Compact microwave', 79.99, 80, 'microwave.jpg', 4, 0, 2),
--     ('Blender', 'Multi-functional blender', 49.99, 150, 'blender.jpg', 4, 0, 2),
--     ('Iron', 'Steam iron', 29.99, 120, 'iron.jpg', 4, 0, 2),
--     ('Toy Car', 'Miniature toy car', 9.99, 500, 'toycar.jpg', 5, 0, 2),
--     ('Doll', 'Doll with accessories', 19.99, 200, 'doll.jpg', 5, 0, 2),
--     ('Board Game', 'Fun board game', 29.99, 150, 'boardgame.jpg', 5, 0, 2),
--     ('Puzzle', '1000-piece puzzle', 14.99, 300, 'puzzle.jpg', 5, 0, 2),
--     ('LEGO Set', 'Building block set', 49.99, 100, 'lego.jpg', 5, 0, 2);

-- DO $$ DECLARE
--     r RECORD;
-- BEGIN
--     FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
--         EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
--     END LOOP;
-- END $$;





