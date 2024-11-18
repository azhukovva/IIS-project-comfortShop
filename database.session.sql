CREATE TABLE categories (
    slug VARCHAR(255) PRIMARY KEY UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    parent_slug VARCHAR(255),
    FOREIGN KEY (parent_slug) REFERENCES categories(slug)
);

INSERT INTO categories (slug, name, parent_slug) 
VALUES ('books', 'Books', NULL);

INSERT INTO categories (slug, name, parent_slug) 
VALUES ('fiction', 'Fiction', 'books');

INSERT INTO categories (slug, name, parent_slug)
VALUES ('candels', 'Candels', NULL);

INSERT INTO categories (slug, name, parent_slug)
VALUES ('beeswax', 'Beeswax', 'candels');

INSERT INTO categories (slug, name, parent_slug)
VALUES ('paraffin', 'Paraffin', 'candels');

INSERT INTO categories (slug, name, parent_slug)
VALUES ('bakery', 'Bakery', NULL);

INSERT INTO categories (slug, name, parent_slug)
VALUES ('bread', 'Bread', 'bakery');

INSERT INTO categories (slug, name, parent_slug)
VALUES ('pastries', 'Pastries', 'bakery');