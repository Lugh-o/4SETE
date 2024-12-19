# 4sete

cp ./api/.env.example ./api/.env;
docker compose up --build -d
docker exec -t laravel_api php artisan migrate:fresh

cd frontend
npm install
npm start
