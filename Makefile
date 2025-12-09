.PHONY: dev up down logs rebuild

dev: ## Запустить с логами
	docker-compose up

up: ## Запустить в фоне
	docker-compose up -d

down: ## Остановить
	docker-compose down

logs: ## Показать логи
	docker-compose logs -f

rebuild: ## Пересобрать
	docker-compose down && docker-compose up --build

