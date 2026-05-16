Write-Host ""
Write-Host "⚛️ Initializing Frontend..."
Write-Host ""

Set-Location frontend

# Install dependencies
if (Test-Path "package.json") {
    npm install
    Write-Host "✅ Frontend dependencies installed"
}
else {
    Write-Host "⚠️ package.json not found"
}

# Verify Vite build
Write-Host ""
Write-Host "🏗️ Testing frontend build..."
Write-Host ""

npm run build

Write-Host ""
Write-Host "🚀 Frontend initialization complete"
Write-Host ""

Set-Location ..