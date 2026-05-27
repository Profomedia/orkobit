#!/bin/bash

echo ""
echo "🚀 Deploying production stack..."
echo ""

git pull

docker compose -f docker-compose.prod.yml up -d --build

echo ""
echo "✅ Production deployment complete"
echo ""