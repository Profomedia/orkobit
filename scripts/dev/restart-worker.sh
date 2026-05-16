#!/bin/bash

echo ""
echo "🔄 Restarting worker..."
echo ""

docker compose restart worker

echo ""
echo "✅ Worker restarted"
echo ""