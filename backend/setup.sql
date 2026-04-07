-- Create database
CREATE DATABASE IF NOT EXISTS assetdb;

-- Use the database
USE assetdb;

-- Create assets table
CREATE TABLE IF NOT EXISTS assets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  serialNumber VARCHAR(255) NOT NULL,
  purchaseDate DATE NOT NULL,
  status ENUM('Available', 'In Use', 'Maintenance') DEFAULT 'Available',
  assignedTo VARCHAR(255)
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE
);