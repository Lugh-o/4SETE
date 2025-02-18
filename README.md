# 4SETE

This project is a low fidelity prototype for a Product Design Course Conclusion Project. Its backend is built using Laravel, with a MySQL database both built into a docker container. The frontend using React Native, via Expo.

## Requirements
- Node.js
- Docker
- Composer
- Expo app to view the program

## Backend
```
cp ./api/.env.example ./api/.env;
docker compose up --build -d
docker exec -t laravel_api php artisan migrate:fresh
```
The API port that is exposed is the 8080, and via the 8081 port you can access the phpmyadmin, both the credentials are defaulted as root. 

## Frontend
```
cd frontend
npm install
npm start
```
After the 'npm start', scan the QR Code on console using Expo Go app and run it. The app is not responsive and built for Android, since it was only aimed for a small test, and not going into production. 
