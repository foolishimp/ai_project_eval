#!/bin/bash

# Test Dashboard Startup Script
# Reads project configuration and starts dashboard with clear port information

set -e

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Check if project config exists
CONFIG_FILE="$SCRIPT_DIR/project-config.json"
if [ ! -f "$CONFIG_FILE" ]; then
    echo "❌ Error: project-config.json not found at $CONFIG_FILE"
    echo "   Dashboard may not be properly configured"
    exit 1
fi

# Read project configuration
PROJECT_NAME=$(cat "$CONFIG_FILE" | grep '"projectName"' | cut -d'"' -f4)
PROJECT_PATH=$(cat "$CONFIG_FILE" | grep '"projectPath"' | cut -d'"' -f4)
PORT=$(cat "$CONFIG_FILE" | grep '"port"' | cut -d':' -f2 | tr -d ' ,')

# Display startup banner
echo ""
echo "🚀 Starting Test Dashboard for $PROJECT_NAME"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📁 Project: $PROJECT_NAME"
echo "📍 Path: $PROJECT_PATH"
echo "🌐 Dashboard URL: http://localhost:$PORT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "💡 Tip: Open http://localhost:$PORT in your browser"
echo "🔄 Press Ctrl+C to stop the dashboard"
echo ""

# For dev instance, run from the dashboard directory itself
# This keeps the working directory as /Users/jim/src/apps/test_dd_dashboard
# so PROJECT_DIRS="." scans only the test_dd_dashboard directory
PROJECT_DIRS="." node server.js