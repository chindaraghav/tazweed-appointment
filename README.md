# Tazweed Appointment App

## Installation

### Server

```bash
cd ./server
yarn install
yarn start
```

### Web

```bash
cd ./web
yarn install
yarn start
```
### Mobile

```bash
cd ./mobile
yarn install
cd ./ios
pod install
```

## Enviroment

Server is set to default config and will run on Port 8080
```
PORT=8080
MONGODB_URL=mongodb://127.0.0.1:27017/tazweed
JWT_SECRET=tazweedsecret
```

Web by default configured to run on port 3000

All enviroments can be changed from ".env" files included in project

Restart web server and rebuild Mobile apps after changing their enviroments