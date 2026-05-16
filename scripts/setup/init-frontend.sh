#!/bin/bash

echo ""
echo "⚛️ Initializing Frontend..."
echo ""

cd frontend || exit

if [ -f "package.json" ]; then
    npm install
    echo "✅ Frontend dependencies installed"
else
    echo "⚠️ package.json not found"
fi

echo ""
echo "🚀 Frontend initialization complete"
echo ""

cd ..