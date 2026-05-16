$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"

$backupDir = "backups"

if (!(Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir
}

$backupFile = "$backupDir/db_backup_$timestamp.sql"

Write-Host ""
Write-Host "💾 Creating PostgreSQL backup..."
Write-Host ""

docker compose exec -T db pg_dump -U postgres postgres > $backupFile

Write-Host ""
Write-Host "✅ Backup saved:"
Write-Host $backupFile
Write-Host ""