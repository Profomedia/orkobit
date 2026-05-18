$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "⚛️ Initializing Orkobit Frontend..."
Write-Host ""

Set-Location frontend

try {

    # --------------------------------------------------
    # VERIFY PACKAGE.JSON
    # --------------------------------------------------

    if (!(Test-Path "package.json")) {
        Write-Host "❌ package.json not found"
        exit 1
    }

    # --------------------------------------------------
    # FRONTEND DEPENDENCIES
    # --------------------------------------------------

    Write-Host "📦 Installing frontend dependencies..."
    Write-Host ""

    npm install `
    react `
    react-dom `
    react-router-dom `
    zustand `
    axios `
    @tanstack/react-query `
    framer-motion `
    lucide-react `
    clsx `
    dexie `
    dexie-react-hooks `
    react-hook-form `
    zod `
    @hookform/resolvers `
    date-fns

    # --------------------------------------------------
    # DEVELOPMENT DEPENDENCIES
    # --------------------------------------------------

    Write-Host ""
    Write-Host "🛠 Installing development dependencies..."
    Write-Host ""

    npm install -D `
    typescript `
    vite `
    @vitejs/plugin-react `
    tailwindcss `
    @tailwindcss/vite `
    postcss `
    autoprefixer `
    @types/react `
    @types/react-dom

    # --------------------------------------------------
    # INITIALIZE TAILWIND
    # --------------------------------------------------

    Write-Host ""
    Write-Host "🎨 Initializing Tailwind CSS..."
    Write-Host ""

    if (!(Test-Path "tailwind.config.js") -and !(Test-Path "tailwind.config.ts")) {
        npx tailwindcss init -p
    }
    else {
        Write-Host "⚠️ Tailwind config already exists. Skipping..."
    }

    # --------------------------------------------------
    # TEST BUILD
    # --------------------------------------------------

    Write-Host ""
    Write-Host "🏗 Testing frontend build..."
    Write-Host ""

    npm run build

    # --------------------------------------------------
    # COMPLETE
    # --------------------------------------------------

    Write-Host ""
    Write-Host "✅ Frontend initialization complete"
    Write-Host ""

}
finally {

    Set-Location ..

}