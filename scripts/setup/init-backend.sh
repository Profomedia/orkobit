#!/bin/bash

echo ""
echo "🐍 Initializing Backend..."
echo ""

cd backend || exit

# Create virtual environment
if [ ! -d ".venv" ]; then
    python3 -m venv .venv
    echo "✅ Virtual environment created"
else
    echo "⚠️ Virtual environment already exists"
fi

# Activate virtual environment
source .venv/bin/activate

# Upgrade pip
pip install --upgrade pip

# Install requirements
if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
    echo "✅ Backend dependencies installed"
fi

echo ""
echo "🚀 Backend initialization complete"
echo ""

cd ..