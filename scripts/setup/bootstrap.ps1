Write-Host ""
Write-Host "🚀 Bootstrapping Orork Stack Template..."
Write-Host ""

# --------------------------------------------------
# ENV SETUP
# --------------------------------------------------

if (!(Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "✅ .env created from .env.example"
}
else {
    Write-Host "⚠️ .env already exists"
}

Write-Host ""

# --------------------------------------------------
# BACKEND INIT
# --------------------------------------------------

Write-Host "🐍 Initializing backend..."
Write-Host ""

& ".\scripts\setup\init-backend.ps1"

Write-Host ""

# --------------------------------------------------
# FRONTEND INIT
# --------------------------------------------------

Write-Host "⚛️ Initializing frontend..."
Write-Host ""

& ".\scripts\setup\init-frontend.ps1"

Write-Host ""

# --------------------------------------------------
# OPTIONAL DOCKER SERVICES
# --------------------------------------------------

$dockerRunning = docker info 2>$null

if ($LASTEXITCODE -eq 0) {
    Write-Host "🐳 Docker detected"
    Write-Host ""

    docker compose -f docker-compose.dev.yml up -d

    Write-Host ""
    Write-Host "✅ Docker services started"
}
else {
    Write-Host "⚠️ Docker not running — skipping containers"
}

Write-Host ""

# --------------------------------------------------
# FINAL SUCCESS
# --------------------------------------------------

Write-Host "🎉 Bootstrap completed successfully!"
Write-Host ""
Write-Host "🚀 Ready for development."
Write-Host ""