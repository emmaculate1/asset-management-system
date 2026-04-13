-- Create database
CREATE DATABASE IF NOT EXISTS assetdb;

USE assetdb;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  description TEXT
);

-- Mini categories table
CREATE TABLE IF NOT EXISTS mini_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  category_id INT,
  description TEXT,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Assets table
CREATE TABLE IF NOT EXISTS assets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50),
  serialNumber VARCHAR(100),
  purchaseDate DATE,
  status VARCHAR(20) DEFAULT 'Available',
  assignedTo VARCHAR(100),
  mini_category_id INT,
  description TEXT,
  value DECIMAL(10,2),
  location VARCHAR(100),
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (mini_category_id) REFERENCES mini_categories(id)
);