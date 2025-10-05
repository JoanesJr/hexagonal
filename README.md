# 🍽️ Hexagonal Architecture - Node.js Clean Modular App

This is a sample API project implementing **Hexagonal Architecture (Ports & Adapters)**, applying **SOLID principles**, **modular context separation**, and a clear distinction between business, infrastructure, and I/O layers.

---

## 📦 Technologies Used

- **Node.js + TypeScript**
- **Express** (HTTP Adapter)
- **Prisma** (ORM)
- **Vitest** (Unit and integration testing)
- **Zod** (Input validation)
- **Docker + Docker Compose**
- **Hexagonal Architecture (Ports & Adapters)**

---

## 🧱 Project Structure

```bash
├── src
│   ├── modules/
│   │   ├── restaurant/
│   │   ├── menuItem/
│   ├── shared/                # Errors, utils, global interfaces
│   ├── infra/
│   │   ├── http/              # Server, routes, middlewares
│   │   └── prisma/            # Client + schema
│   │   └── queue/             # Queue configuration
│   ├── adapters/
│   │   ├── inbound/http/      # HTTP Controllers
│   │   ├── inbound/queue/     # Consumers
│   │   └── outbound/prisma/   # Repositories
│   └── index.ts               # Entry point
```

---

## 🚀 How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/JoanesJr/hexagonal.git
cd hexagonal
```

### 2. Start the database with Docker

```bash
docker-compose up -d
```

> This will spin up a PostgreSQL database running locally on port `5432`.

### 3. Install dependencies

```bash
pnpm install
```

### 4. Generate Prisma client and apply migrations

```bash
pnpm prisma:generate
pnpm prisma:migrate
```

---

## 🧪 Running Tests

### Unit Tests

```bash
pnpm test:unit #Run test using InMemoryDatabase
```

### Integration Tests

```bash
pnpm test:integration #Run test using PrismaDatabase
```

### Test Coverage

```bash
pnpm test:coverage
```

---

## 🖥️ Running the Server

### In development mode

```bash
pnpm dev
```

---

## 🧠 Principles & Patterns Applied

- **Hexagonal Architecture**  
  Clear separation of application, domain, and adapters (inbound/outbound)

- **SOLID**  
  Single responsibility, dependency injection, clean interfaces

- **TDD**  
  Using both `in-memory` repositories and Prisma integration tests

- **DTOs + Zod**  
  Input validation handled at the adapter layer

- **Use Cases**  
  Pure business logic, decoupled from infrastructure

## Observality
- [Jaeguer] (http://localhost:16686/)

---

## Author

**Joanes Lebarch**  
📧 joanesdejesusjr@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/joanesjr/)