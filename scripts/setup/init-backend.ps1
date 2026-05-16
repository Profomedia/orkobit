Write-Host ""
Write-Host "🐍 Initializing Backend..."
Write-Host ""

Set-Location backend

# Create virtual environment
if (!(Test-Path ".venv")) {
    python -m venv .venv
    Write-Host "✅ Virtual environment created"
}
else {
    Write-Host "⚠️ Virtual environment already exists"
}

# Activate virtual environment
Write-Host ""
Write-Host "⚡ Activating virtual environment..."
Write-Host ""

& ".\.venv\Scripts\Activate.ps1"

# Upgrade pip
python -m pip install --upgrade pip

# Install dependencies
if (Test-Path "requirements.txt") {
    pip install -r requirements.txt
    Write-Host "✅ Backend dependencies installed"
}
else {
    Write-Host "⚠️ requirements.txt not found"
}

# Run migrations
if (Test-Path "manage.py") {
    python manage.py migrate
    Write-Host "✅ Migrations completed"
}
else {
    Write-Host "⚠️ manage.py not found"
}

Write-Host ""
Write-Host "🚀 Backend initialization complete"
Write-Host ""

Set-Location ..