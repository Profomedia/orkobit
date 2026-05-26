.PHONY: up build down restart logs logs-all backend frontend worker clean
# --------------------------------------------------
# DOCKER COMPOSE
# --------------------------------------------------

COMPOSE=docker compose -f docker-compose.dev.yml

# --------------------------------------------------
# DEVELOPMENT
# --------------------------------------------------

up:
	$(COMPOSE) up -d

build:
	$(COMPOSE) up -d --build

down:
	$(COMPOSE) down

purge:
	$(COMPOSE) down -v

# 	find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
#   find . -path "*/migrations/*.pyc" -delete

restart:
	$(COMPOSE) restart

rb:
	$(COMPOSE) restart backend

logs:
	$(COMPOSE) logs -f backend

logs-all:
	$(COMPOSE) logs -f

# --------------------------------------------------
# BACKEND
# --------------------------------------------------

backend:
	$(COMPOSE) exec backend bash

migrate:
	$(COMPOSE) exec backend python manage.py migrate

makemigrations:
	$(COMPOSE) exec backend python manage.py makemigrations

superuser:
	$(COMPOSE) exec backend python manage.py createsuperuser

test:
	$(COMPOSE) exec backend python manage.py test

shell:
	$(COMPOSE) exec backend python manage.py shell

seed_habits:
	$(COMPOSE) exec backend python manage.py seed_habits


# --------------------------------------------------
# FRONTEND
# --------------------------------------------------

frontend:
	$(COMPOSE) exec frontend sh

frontend-i:
	bash ./scripts/setup/init-frontend.sh

frontend-dev:
	cd frontend && npm run dev

frontend-build:
	cd frontend && npm run build

lint:
	cd frontend && npm run lint -- --write

# --------------------------------------------------
# WORKER
# --------------------------------------------------

worker:
	$(COMPOSE) exec worker bash

restart-worker:
	$(COMPOSE) restart worker

# --------------------------------------------------
# DATABASE
# --------------------------------------------------

db:
	$(COMPOSE) exec db psql -U orkobit_user -d orkobit_db

# --------------------------------------------------
# CLEANUP
# --------------------------------------------------

clean:
	docker system prune -af

clean-volumes:
	docker volume prune -f

# --------------------------------------------------
# SETUP
# --------------------------------------------------

bootstrap:
	bash ./scripts/setup/bootstrap.sh

init-backend:
	bash ./scripts/setup/init-backend.sh

init-frontend:
	bash ./scripts/setup/init-frontend.sh

# --------------------------------------------------
# DEPLOYMENT
# --------------------------------------------------

deploy:
	bash ./scripts/deploy/deploy-prod.sh