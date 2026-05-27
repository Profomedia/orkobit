#!/bin/bash

timestamp=$(date +"%Y%m%d_%H%M%S")

backup_dir="backups"

mkdir -p "$backup_dir"

backup_file="$backup_dir/db_backup_$timestamp.sql"

echo ""
echo "💾 Creating PostgreSQL backup..."
echo ""

docker compose exec -T db pg_dump -U postgres postgres > "$backup_file"

echo ""
echo "✅ Backup saved:"
echo "$backup_file"
echo ""