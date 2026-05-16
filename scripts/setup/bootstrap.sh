#!/bin/bash

echo ""
echo "🚀 Bootstrapping Orork Stack Template..."
echo ""

# --------------------------------------------------
# ENV SETUP
# --------------------------------------------------

if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "✅ .env created from .env.example"
else
    echo "⚠️ .env already exists"
fi

echo ""

# --------------------------------------------------
# BACKEND INIT
# --------------------------------------------------

echo "🐍 Initializing backend..."
echo ""

bash ./scripts/setup/init-backend.sh

echo ""

# --------------------------------------------------
# FRONTEND INIT
# --------------------------------------------------

echo "⚛️ Initializing frontend..."
echo ""

bash ./scripts/setup/init-frontend.sh

echo ""

# --------------------------------------------------
# OPTIONAL DOCKER SERVICES
# --------------------------------------------------

if command -v docker &> /dev/null
then
    echo "🐳 Docker detected"
    docker compose -f docker-compose.dev.yml up -d

    echo ""
    echo "✅ Docker services started"
else
    echo "⚠️ Docker not installed"
fi

echo ""
echo "🎉 Bootstrap completed successfully!"
echo ""