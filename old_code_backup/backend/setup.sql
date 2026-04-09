-- Create database
CREATE DATABASE IF NOT EXISTS assetdb;

-- Use the database
USE assetdb;

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS assets;
DROP TABLE IF EXISTS mini_categories;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS admin_users;
DROP TABLE IF EXISTS users;

-- Create categories table
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create mini_categories table
CREATE TABLE mini_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category_id INT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Create admin users table
CREATE TABLE admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE
);

-- Create assets table
CREATE TABLE assets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  serialNumber VARCHAR(255) NOT NULL,
  purchaseDate DATE NOT NULL,
  status ENUM('Available', 'In Use', 'Maintenance') DEFAULT 'Available',
  assignedTo VARCHAR(255),
  mini_category_id INT,
  FOREIGN KEY (mini_category_id) REFERENCES mini_categories(id) ON DELETE SET NULL
);

-- Insert default categories and mini categories
INSERT INTO categories (name, description) VALUES 
('Electronics', 'Electronic devices and equipment'),
('Furniture', 'Office furniture and fixtures'),
('Vehicles', 'Company vehicles and transportation'),
('Software', 'Software licenses and digital assets'),
('Tools', 'Tools and equipment');

INSERT INTO mini_categories (name, category_id, description) VALUES 
-- Electronics mini categories
('Laptops', 1, 'Laptop computers and notebooks'),
('Desktops', 1, 'Desktop computers and workstations'),
('Monitors', 1, 'Computer monitors and displays'),
('Keyboards', 1, 'Computer keyboards'),
('Mouse', 1, 'Computer mouse devices'),
('Printers', 1, 'Printers and scanners'),
('Phones', 1, 'Mobile phones and tablets'),

-- Furniture mini categories
('Chairs', 2, 'Office chairs and seating'),
('Desks', 2, 'Office desks and workstations'),
('Tables', 2, 'Conference and meeting tables'),
('Storage', 2, 'Storage cabinets and shelves'),
('Sofas', 2, 'Office sofas and lounge furniture'),

-- Vehicles mini categories
('Cars', 3, 'Company cars'),
('Trucks', 3, 'Company trucks and vans'),
('Motorcycles', 3, 'Company motorcycles'),

-- Software mini categories
('Operating Systems', 4, 'OS licenses'),
('Office Software', 4, 'Office productivity software'),
('Development Tools', 4, 'Software development tools'),
('Security Software', 4, 'Antivirus and security software'),

-- Tools mini categories
('Power Tools', 5, 'Electric power tools'),
('Hand Tools', 5, 'Manual hand tools'),
('Measurement Tools', 5, 'Measurement and testing equipment');

-- Insert default admin user (password: admin123)
INSERT INTO admin_users (username, password, email) VALUES 
('admin', 'admin123', 'admin@company.com');