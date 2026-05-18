#!/bin/bash

set -e

echo ""
echo "⚛️ Initializing Orkobit Frontend..."
echo ""

cd frontend || exit

# --------------------------------------------------
# VERIFY PACKAGE.JSON
# --------------------------------------------------

if [ ! -f "package.json" ]; then
    echo "❌ package.json not found"
    exit 1
fi

# --------------------------------------------------
# FRONTEND DEPENDENCIES
# --------------------------------------------------

echo "📦 Installing frontend dependencies..."
echo ""

npm install \
react \
react-dom \
react-router-dom \
zustand \
axios \
@tanstack/react-query \
framer-motion \
lucide-react \
clsx \
dexie \
dexie-react-hooks \
react-hook-form \
zod \
@hookform/resolvers \
date-fns

# --------------------------------------------------
# DEVELOPMENT DEPENDENCIES
# --------------------------------------------------

echo ""
echo "🛠 Installing development dependencies..."
echo ""

npm install -D \
typescript \
vite \
@vitejs/plugin-react \
tailwindcss \
@tailwindcss/vite \
postcss \
autoprefixer \
@types/react \
@types/react-dom

# --------------------------------------------------
# INITIALIZE TAILWIND
# --------------------------------------------------

echo ""
echo "🎨 Initializing Tailwind CSS..."
echo ""

if [ ! -f "tailwind.config.js" ] && [ ! -f "tailwind.config.ts" ]; then
    npx tailwindcss init -p
else
    echo "⚠️ Tailwind config already exists. Skipping..."
fi

# --------------------------------------------------
# TEST BUILD
# --------------------------------------------------

echo ""
echo "🏗 Testing frontend build..."
echo ""

npm run build

# --------------------------------------------------
# COMPLETE
# --------------------------------------------------

echo ""
echo "✅ Frontend initialization complete"
echo ""

cd ..