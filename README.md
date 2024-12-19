# 4sete
 

setup api

after cloning
cp ./api/.env.example ./api/.env; cd api; composer install; cd ../
docker compose up --build -d

migrate
docker exec -t laravel_api php artisan migrate:fresh

cd frontend
npm start -y