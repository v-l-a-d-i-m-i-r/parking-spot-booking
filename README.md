# Parking spot booking

## Setup
```
cp example.env .env

docker-compose up --build

docker exec -ti server npm run typeorm:run-migration
```

## Ports
- `5432` PostgreSQL
- `3000` Server

## Swagger documentation
[http://localhost:3000/swagger](http://localhost:3000/swagger)
