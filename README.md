# Enterprise Warehouse Management System (WMS)

A modern **Enterprise Warehouse Management System (WMS)** built using **Spring Boot, React.js, and PostgreSQL** to manage warehouse operations efficiently with real-time inventory tracking, product management, and analytics.

---

## Overview

This project is designed to streamline warehouse operations through a secure and scalable system. It enables efficient product management, warehouse tracking, inventory monitoring, and low-stock detection using a modern full-stack architecture.

---

## Features

### Authentication & Security

* JWT Authentication
* Secure Login System
* Protected Routes
* Logout Functionality

### Product Management

* Add Products
* Update Products
* Delete Products
* Search Products
* SKU Support

### Warehouse Management

* Add Warehouse
* Update Warehouse
* Delete Warehouse
* Multi-Warehouse Tracking

### Inventory Management

* Product-Warehouse Mapping
* Inventory Quantity Tracking
* Stock Management
* Live Inventory Count

### Low Stock Alerts

* Real-Time Low Stock Detection
* Dashboard Alerts
* Warehouse-Wise Stock Visibility

### Dashboard

* Modern Enterprise UI
* Live Statistics
* Analytics Charts
* Real-Time Insights

---

## Technology Stack

### Frontend

* React.js
* Tailwind CSS
* Framer Motion
* Axios
* Recharts
* Lucide React Icons

### Backend

* Java 17+
* Spring Boot 3.x
* Spring Security
* JWT Authentication
* Spring Data JPA / Hibernate

### Database

* PostgreSQL

---

## Project Structure

```bash
frontend/
│── components/
│── pages/
│── services/

backend/
│── controller/
│── service/
│── repository/
│── entity/
│── security/
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/SaiSnehasree/enterprise-wms.git
```

### Backend Setup

```bash
cd backend
```

Configure PostgreSQL database inside:

```properties
application.properties
```

Run the Spring Boot application.

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## Modules

* Login Authentication
* Dashboard
* Products Module
* Warehouse Module
* Inventory Module
* Low Stock Alerts

---

## Future Enhancements

* Role-Based Access (Admin / Operator)
* Real Analytics Dashboard
* Order Management Workflow
* Barcode / QR Integration
* Advanced Reports
* Notifications System

---

## Developed By

**Meda Sai Sneha Sree**
