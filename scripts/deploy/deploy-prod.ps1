Write-Host ""
Write-Host "🚀 Deploying production stack..."
Write-Host ""

git pull

docker compose -f docker-compose.prod.yml up -d --build

Write-Host ""
Write-Host "✅ Production deployment complete"
Write-Host ""