# --------------------------------------------------
# DEVELOPMENT
# --------------------------------------------------

up:
	docker compose -f docker-compose.dev.yml up -d

build:
	docker compose -f docker-compose.dev.yml up -d --build

down:
	docker compose down

restart:
	docker compose restart

logs:
	docker compose logs -f

# --------------------------------------------------
# BACKEND
# --------------------------------------------------

backend:
	docker compose exec backend bash

migrate:
	docker compose exec backend python manage.py migrate

makemigrations:
	docker compose exec backend python manage.py makemigrations

superuser:
	docker compose exec backend python manage.py createsuperuser

test:
	docker compose exec backend python manage.py test

shell:
	docker compose exec backend python manage.py shell

# --------------------------------------------------
# FRONTEND
# --------------------------------------------------

frontend:
	docker compose exec frontend sh

frontend-install:
	cd frontend && npm install

frontend-dev:
	cd frontend && npm run dev

frontend-build:
	cd frontend && npm run build

# --------------------------------------------------
# WORKER
# --------------------------------------------------

worker:
	docker compose exec worker bash

restart-worker:
	docker compose restart worker

# --------------------------------------------------
# DATABASE
# --------------------------------------------------

db:
	docker compose exec db psql -U postgres

db-backup:
	bash ./scripts/backup/db-backup.sh

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