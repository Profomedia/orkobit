$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "=== ORKOBIT FRONTEND RESTRUCTURE STARTING ==="
Write-Host ""

# --------------------------------------------------
# Paths
# --------------------------------------------------

$frontend = "frontend/src"

# --------------------------------------------------
# Create missing scalable folders
# --------------------------------------------------

$folders = @(
    "$frontend/lib",
    "$frontend/utils",
    "$frontend/features/habits/hooks",
    "$frontend/features/habits/services",
    "$frontend/features/habits/types",
    "$frontend/features/auth/hooks",
    "$frontend/features/auth/types",
    "$frontend/features/shared",
    "$frontend/types"
)

foreach ($folder in $folders) {
    if (!(Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder | Out-Null
        Write-Host "Created: $folder"
    }
}

# --------------------------------------------------
# Helper function
# --------------------------------------------------

function Move-WithGit {
    param (
        [string]$Source,
        [string]$Destination
    )

    if (Test-Path $Source) {

        $destDir = Split-Path $Destination

        if (!(Test-Path $destDir)) {
            New-Item -ItemType Directory -Path $destDir | Out-Null
        }

        if (!(Test-Path $Destination)) {
            git mv $Source $Destination
            Write-Host "Moved: $Source -> $Destination"
        }
        else {
            Write-Host "Skipped (exists): $Destination"
        }
    }
    else {
        Write-Host "Skipped (missing): $Source"
    }
}

# --------------------------------------------------
# Create infrastructure files
# --------------------------------------------------

$apiFile = "$frontend/lib/api.ts"

if (!(Test-Path $apiFile)) {
@"
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials:true,
});

export default api;
"@ | Set-Content $apiFile

    Write-Host "Created: lib/api.ts"
}

$queryFile = "$frontend/lib/react-query.ts"

if (!(Test-Path $queryFile)) {
@"
import {QueryClient,} from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      retry:1,
      refetchOnWindowFocus:false,
    },
  },
});
"@ | Set-Content $queryFile

    Write-Host "Created: lib/react-query.ts"
}

# --------------------------------------------------
# Move misplaced hooks
# --------------------------------------------------

Move-WithGit `
"$frontend/hooks/useHabits.ts" `
"$frontend/features/habits/hooks/useHabits.ts"

Move-WithGit `
"$frontend/hooks/useHabitEntries.ts" `
"$frontend/features/habits/hooks/useHabitEntries.ts"

Move-WithGit `
"$frontend/hooks/useUser.ts" `
"$frontend/features/auth/hooks/useUser.ts"

# --------------------------------------------------
# Move misplaced services
# --------------------------------------------------

Move-WithGit `
"$frontend/services/habits.service.ts" `
"$frontend/features/habits/services/habits.service.ts"

Move-WithGit `
"$frontend/services/habit-entries.service.ts" `
"$frontend/features/habits/services/habit-entries.service.ts"

# --------------------------------------------------
# Remove duplicate auth structure
# --------------------------------------------------

Move-WithGit `
"$frontend/components/auth/components/ProtectedRoute.tsx" `
"$frontend/features/auth/components/ProtectedRoute.tsx"

Move-WithGit `
"$frontend/components/auth/pages/LogoutPage.tsx" `
"$frontend/features/auth/pages/LogoutPage.tsx"

# --------------------------------------------------
# Consolidate types
# --------------------------------------------------

$habitTypes = "$frontend/types/habit.types.ts"

if (!(Test-Path $habitTypes)) {
@"
export type HabitType =
  | "checkbox"
  | "number"
  | "timer";

export interface Habit {
  id:string;
  name:string;
  description?:string;

  habit_type:HabitType;

  frequency_type:string;

  target_value?:number;

  created_at?:string;
  updated_at?:string;
}

export type HabitValue =
  | boolean
  | number;
"@ | Set-Content $habitTypes

    Write-Host "Created: shared habit types"
}

# --------------------------------------------------
# Remove duplicate daily-checkin types
# --------------------------------------------------

$duplicateTypes = @(
    "$frontend/features/daily-checkin/types/habit.ts"
)

foreach ($file in $duplicateTypes) {
    if (Test-Path $file) {
        git rm $file
        Write-Host "Removed duplicate type: $file"
    }
}

Write-Host ""
Write-Host "=== RESTRUCTURE COMPLETE ==="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. Fix imports"
Write-Host "2. Run npm run build"
Write-Host ""