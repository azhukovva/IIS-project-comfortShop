INSERT INTO categories (slug, name, parent_slug) 
VALUES ('books', 'Books', NULL);

INSERT INTO categories (slug, name, parent_slug)
VALUES ('candels', 'Candels', NULL);

INSERT INTO categories (slug, name, parent_slug)
VALUES ('bakery', 'Bakery', NULL);


INSERT INTO categories (slug, name, parent_slug) 
VALUES ('fiction', 'Fiction', 'books');

INSERT INTO categories (slug, name, parent_slug)
VALUES ('beeswax', 'Beeswax', 'candels');
INSERT INTO categories (slug, name, parent_slug)
VALUES ('paraffin', 'Paraffin', 'candels');

INSERT INTO categories (slug, name, parent_slug)
VALUES ('bread', 'Bread', 'bakery');

INSERT INTO categories (slug, name, parent_slug)
VALUES ('pastries', 'Pastries', 'bakery');



