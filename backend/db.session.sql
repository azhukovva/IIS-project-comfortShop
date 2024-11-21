INSERT INTO shop_category (name, slug, image, parent_id)
VALUES (
    'Books',
    'books',
    NULL,
    NULL
  ); 
INSERT INTO auth_group (id, name)
VALUES (1, 'admin'), (2, 'user');

-- Insert into auth_group_permissions
INSERT INTO auth_group_permissions (id, group_id, permission_id)
VALUES (1, 1, 1), (2, 2, 2);

-- Insert into auth_permission
INSERT INTO auth_permission (id, name, content_type_id, codename)
VALUES (1, 'Can add user', 1, 'add_user'), (2, 'Can change user', 1, 'change_user');

-- Insert into auth_user
INSERT INTO auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined)
VALUES (1, 'password', '2024-11-21 21:12:47+00', true, 'admin', 'Admin', 'User', 'admin@example.com', true, true, '2024-11-21 21:12:47+00');

-- Insert into auth_user_groups
INSERT INTO auth_user_groups (id, user_id, group_id)
VALUES (1, 1, 1);

-- Insert into auth_user_user_permissions
INSERT INTO auth_user_user_permissions (id, user_id, permission_id)
VALUES (1, 1, 1);

-- Insert into authtoken_token
INSERT INTO authtoken_token ("key", created, user_id)
VALUES ('key', '2024-11-21 21:12:47+00', 1);  

-- Insert into django_admin_log
INSERT INTO django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id)
VALUES (1, '2024-11-21 21:12:47+00', '1', 'User', 1, 'Created user', 1, 1);

-- Insert into django_content_type
INSERT INTO django_content_type (id, app_label, model)
VALUES (1, 'auth', 'user');

-- Insert into django_migrations
INSERT INTO django_migrations (id, app, name, applied)
VALUES (1, 'auth', '0001_initial', '2024-11-21 21:12:47+00');

-- Insert into django_session
INSERT INTO django_session (session_key, session_data, expire_date)
VALUES ('session_key', 'session_data', '2024-11-21 21:12:47+00');

-- Insert into shop_attribute
INSERT INTO shop_attribute (id, name, category_id)
VALUES (1, 'Color', 1);

INSERT INTO shop_category (slug, name, parent_id, image) 
VALUES 
  ('dishes', 'Dishes', NULL, NULL),
  ('candles', 'Candles', NULL, NULL);

-- Subcategories for Plants
INSERT INTO shop_category (slug, name, parent_id, image) 
VALUES 
  ('indoor-plants', 'Indoor Plants', (SELECT id FROM shop_category WHERE slug = 'plants'), NULL),
  ('outdoor-plants', 'Outdoor Plants', (SELECT id FROM shop_category WHERE slug = 'plants'), NULL),
  ('succulents', 'Succulents', (SELECT id FROM shop_category WHERE slug = 'plants'), NULL);

-- Subcategories for Dishes
INSERT INTO shop_category (slug, name, parent_id, image) 
VALUES 
  ('ceramic-dishes', 'Ceramic Dishes', (SELECT id FROM shop_category WHERE slug = 'dishes'), NULL),
  ('glass-dishes', 'Glass Dishes', (SELECT id FROM shop_category WHERE slug = 'dishes'), NULL),
  ('steel-dishes', 'Steel Dishes', (SELECT id FROM shop_category WHERE slug = 'dishes'), NULL);

INSERT INTO shop_category (slug, name, parent_id, image) 
VALUES 
  ('scented-candles', 'Scented Candles', (SELECT id FROM shop_category WHERE slug = 'candles'), NULL),
  ('unscented-candles', 'Unscented Candles', (SELECT id FROM shop_category WHERE slug = 'candles'), NULL),
  ('decorative-candles', 'Decorative Candles', (SELECT id FROM shop_category WHERE slug = 'candles'), NULL);


-- Insert into shop_attributevalue
INSERT INTO shop_attributevalue (id, value, attribute_id)
VALUES (1, 'Red', 1);

-- Insert into shop_basket
INSERT INTO shop_basket (id, user_id)
VALUES (1, 1);

-- Insert into shop_basketproduct
INSERT INTO shop_basketproduct (id, quantity, basket_id, product_id)
VALUES (1, 2, 1, 1);

-- Insert into shop_order
INSERT INTO shop_order (id, created_at, updated_at, user_id)
VALUES (1, '2024-11-21 21:12:47+00', '2024-11-21 21:12:47+00', 1);

-- Insert into shop_orderproduct
INSERT INTO shop_orderproduct (id, quantity, price, order_id, product_id)
VALUES (1, 2, 10.99, 1, 1);   

INSERT INTO shop_product (id, title, description, price, stock, category_id, user_id, image)
VALUES 
(3, '1984', 'A dystopian novel by George Orwell', 9.99, 40, 1, 1, '1984.jpg'),
(4, 'Pride and Prejudice', 'A romantic novel by Jane Austen', 7.99, 20, 1, 1, 'pride_and_prejudice.jpg'),
(5, 'The Catcher in the Rye', 'A novel by J.D. Salinger', 6.99, 25, 1, 1, 'catcher_in_the_rye.jpg');

INSERT INTO shop_review (id)
VALUES (1);
