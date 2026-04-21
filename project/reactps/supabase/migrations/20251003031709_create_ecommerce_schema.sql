/*
  # E-commerce Database Schema

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text) - Product name
      - `description` (text) - Product description
      - `price` (numeric) - Product price
      - `image_url` (text) - Product image URL
      - `category` (text) - Product category
      - `stock` (integer) - Available stock quantity
      - `created_at` (timestamptz) - Creation timestamp
    
    - `orders`
      - `id` (uuid, primary key)
      - `total` (numeric) - Order total amount
      - `status` (text) - Order status (pending, completed, cancelled)
      - `customer_name` (text) - Customer name
      - `customer_email` (text) - Customer email
      - `customer_address` (text) - Full shipping address
      - `created_at` (timestamptz) - Creation timestamp
    
    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid) - Reference to orders
      - `product_id` (uuid) - Reference to products
      - `product_name` (text) - Product name at time of order
      - `product_price` (numeric) - Product price at time of order
      - `quantity` (integer) - Quantity ordered
      - `created_at` (timestamptz) - Creation timestamp

  2. Security
    - Enable RLS on all tables
    - Products are publicly readable
    - Orders are publicly insertable and readable by anyone
    - Order items are publicly insertable and readable through order
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  price numeric NOT NULL CHECK (price >= 0),
  image_url text DEFAULT '',
  category text DEFAULT 'general',
  stock integer DEFAULT 0 CHECK (stock >= 0),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  total numeric NOT NULL CHECK (total >= 0),
  status text DEFAULT 'pending',
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_address text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id),
  product_name text NOT NULL,
  product_price numeric NOT NULL CHECK (product_price >= 0),
  quantity integer NOT NULL CHECK (quantity > 0),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view orders"
  ON orders FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view order items"
  ON order_items FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create order items"
  ON order_items FOR INSERT
  WITH CHECK (true);

INSERT INTO products (name, description, price, image_url, category, stock) VALUES
  ('Wireless Headphones', 'Premium noise-cancelling wireless headphones with 30-hour battery life', 149.99, 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800', 'Electronics', 25),
  ('Smart Watch', 'Fitness tracker with heart rate monitor and GPS', 299.99, 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800', 'Electronics', 15),
  ('Laptop Backpack', 'Durable water-resistant backpack with laptop compartment', 79.99, 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800', 'Accessories', 40),
  ('Portable Charger', '20000mAh high-capacity power bank with fast charging', 49.99, 'https://images.pexels.com/photos/4792285/pexels-photo-4792285.jpeg?auto=compress&cs=tinysrgb&w=800', 'Electronics', 50),
  ('Yoga Mat', 'Eco-friendly non-slip yoga mat with carrying strap', 34.99, 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=800', 'Fitness', 30),
  ('Coffee Maker', 'Programmable coffee maker with thermal carafe', 89.99, 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=800', 'Home', 20),
  ('Running Shoes', 'Lightweight breathable running shoes with cushioned sole', 119.99, 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800', 'Fitness', 35),
  ('Desk Lamp', 'LED desk lamp with adjustable brightness and color temperature', 44.99, 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800', 'Home', 45)
ON CONFLICT DO NOTHING;