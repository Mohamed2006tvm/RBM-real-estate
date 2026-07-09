# Database Documentation: RBM Realestate

This document details the database architecture, index designs, scalability policies, and sample SQL queries for the **RBM Realestate** enterprise real estate backend.

---

## 1. Text-Based Entity-Relationship Diagram (ERD)

```
+------------------+         +------------------+         +------------------+
|      users       |         |      agents      |         |   appointments   |
|------------------|         |------------------|         |------------------|
| PK id (UUID)     |<--1:1---| PK id (UUID)     |<--1:N---| PK id (UUID)     |
|    name          |         | FK user_id (UUID)|         | FK property_id   |
|    email (UQ)    |         |    designation   |         | FK customer_id   |
|    phone         |         |    experience    |         | FK agent_id      |
|    role (Enum)   |         |    rating        |         |    date & status |
+------------------+         +------------------+         +------------------+
         |                            ^                            |
        1:N                          1:N                          1:N
         |                            |                            |
         v                            |                            v
+------------------+                  |                  +------------------+
|    properties    |                  |                  |      leads       |
|------------------|                  |                  |------------------|
| PK id (UUID)     |                  |                  | PK id (UUID)     |
|    title & slug  |                  |                  | FK property_id   |
|    price & type  |                  |                  |    customer info |
| FK created_by    |                  |                  | FK assigned_agent|
+------------------+                  |                  |    status & date |
   |      |      |                    |                  +------------------+
  1:N    1:N    1:N                   |
   |      |      +--------+           |
   |      |               |           |
   v      v               v           |
+------+------+        +------+       |
|images|docs  |        |videos|       |
+------+------+        +------+       |
                                      |
+-------------------------------------+
|
|   +------------------+         +------------------+         +------------------+
|   |    amenities     |         |property_amenities|         |    properties    |
|   |------------------|         |------------------|         |------------------|
+-->| PK id (UUID)     |<--1:N---| PK property_id   |---N:1-->| PK id (UUID)     |
    |    name & icon   |         | PK amenity_id    |         |                  |
    +------------------+         +------------------+         +------------------+
```

---

## 2. Table Specifications & Normalization Choice
1. **UUID Primary Keys**: Prevents ID enumeration attacks and facilitates cross-server replication and data scaling.
2. **Soft Delete Model**: Real estate listings and users are never hard deleted. Rows specify a nullable `deleted_at` timestamp. Indexes include the conditional filter `WHERE deleted_at IS NULL` to ensure querying active data does not scan soft-deleted rows.
3. **1-to-1 Extension (`agents`)**: Separates agent-specific fields (ratings, bios, experience) from base credentials stored in `users`, keeping the users table thin and highly readable.

---

## 3. Optimized Index Rationale
*   **Partial Indexes**:
    `CREATE INDEX idx_properties_city ON properties(city) WHERE deleted_at IS NULL;`
    By excluding deleted rows, index sizes stay small and keep scan rates fast even with millions of listings.
*   **Composite Index**:
    `CREATE INDEX idx_properties_type_purpose ON properties(property_type, purpose) WHERE deleted_at IS NULL;`
    Speeds up dual filters matching criteria like "For Sale + Penthouses" instantly.
*   **Descending Order Sort**:
    `CREATE INDEX idx_properties_created_at ON properties(created_at DESC);`
    Directly returns newly posted listings without requiring full-table database sorting operations.

---

## 4. Sample SQL Queries

### A. Advanced Real Estate Filter Search
*Query logic for property listings filtering by location, price threshold, type, and availability.*
```sql
SELECT p.id, p.title, p.price, p.city, p.bedrooms, p.bathrooms, p.area, p.featured,
       img.image_url AS cover_image
FROM properties p
LEFT JOIN property_images img ON img.property_id = p.id AND img.is_cover = true
WHERE p.deleted_at IS NULL
  AND p.status = 'AVAILABLE'
  AND p.city = 'Manhattan'
  AND p.property_type = 'PENTHOUSE'
  AND p.price BETWEEN 5000000 AND 15000000
ORDER BY p.created_at DESC
LIMIT 12 OFFSET 0;
```

### B. Lead Conversion & Agent Performance Dashboard
*Aggregates active leads, closed sales, and assigned agents.*
```sql
SELECT u.name AS agent_name,
       COUNT(l.id) AS total_leads_assigned,
       COUNT(CASE WHEN l.status = 'CLOSED' THEN 1 END) AS successful_closures,
       ROUND(
         (COUNT(CASE WHEN l.status = 'CLOSED' THEN 1 END)::NUMERIC / NULLIF(COUNT(l.id), 0)) * 100, 
         2
       ) AS conversion_percentage
FROM agents a
JOIN users u ON a.user_id = u.id
LEFT JOIN leads l ON l.assigned_agent = a.id
GROUP BY u.name
ORDER BY conversion_percentage DESC NULLS LAST;
```

### C. Upcoming Site Visit Schedule (Appointments)
*Lists scheduled property viewings for the next 7 days.*
```sql
SELECT app.appointment_date, 
       client.name AS client_name, 
       client.phone AS client_phone,
       u_agent.name AS agent_name, 
       prop.title AS property_title, 
       prop.city
FROM appointments app
JOIN users client ON app.customer_id = client.id
JOIN agents ag ON app.agent_id = ag.id
JOIN users u_agent ON ag.user_id = u_agent.id
JOIN properties prop ON app.property_id = prop.id
WHERE app.status = 'SCHEDULED'
  AND app.appointment_date BETWEEN NOW() AND NOW() + INTERVAL '7 days'
ORDER BY app.appointment_date ASC;
```
