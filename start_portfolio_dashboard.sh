#!/bin/bash

# AI Project Portfolio Dashboard Startup Script

echo "🚀 Starting AI Project Portfolio Dashboard System"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Get the directory of this script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$SCRIPT_DIR"

echo "📁 Working directory: $SCRIPT_DIR"

# Check if projects exist
PROJECT_COUNT=$(find projects/ -name "*.md" -type f | wc -l | tr -d ' ')
echo "📋 Found $PROJECT_COUNT project files in projects/ directory"

if [ "$PROJECT_COUNT" -eq 0 ]; then
    echo "⚠️  No project files found. The dashboard will use fallback sample data."
else
    echo "✅ Project files detected:"
    find projects/ -name "*.md" -type f -exec basename {} \; | sed 's/^/  • /'
fi

echo ""
echo "🔧 Starting project server with automatic port allocation..."

# Start the project server in background
node project_server.js &
SERVER_PID=$!

# Wait a moment for server to start
sleep 3

# Check if server started successfully
if ps -p $SERVER_PID > /dev/null; then
    echo "✅ Project server started successfully (PID: $SERVER_PID)"
    
    # Read port info from .port file
    if [ -f ".port" ]; then
        PORT=$(cat .port | grep -o '"port": *[0-9]*' | grep -o '[0-9]*')
        if [ -n "$PORT" ]; then
            echo "📍 Server is running on port $PORT"
            
            echo ""
            echo "🌐 Available URLs:"
            echo "   Portfolio Dashboard: http://localhost:$PORT/dashboard"
            echo "   Projects API:       http://localhost:$PORT/api/projects"
            echo "   Health Check:       http://localhost:$PORT/api/health"
            echo ""
            echo "🎯 Opening portfolio dashboard in your default browser..."
            
            # Open browser after a short delay
            sleep 1
            
            # Try different open commands based on OS
            if command -v open &> /dev/null; then
                # macOS
                open "http://localhost:$PORT/dashboard"
            elif command -v xdg-open &> /dev/null; then
                # Linux
                xdg-open "http://localhost:$PORT/dashboard"
            elif command -v start &> /dev/null; then
                # Windows
                start "http://localhost:$PORT/dashboard"
            else
                echo "   Please manually open: http://localhost:$PORT/dashboard"
            fi
        else
            echo "⚠️  Could not read port from .port file, using default port 8100"
            PORT=8100
        fi
    else
        echo "⚠️  Port file not found, using default port 8100"
        PORT=8100
    fi
    
    echo ""
    echo "📊 Dashboard Features:"
    echo "   • Risk/Value matrix visualization"
    echo "   • Project filtering by priority, strategy, and category"
    echo "   • Real-time data loading from projects/ folder"
    echo "   • Interactive project tooltips and details"
    echo ""
    echo "🛑 To stop the server, press Ctrl+C or run:"
    echo "   kill $SERVER_PID"
    echo ""
    echo "⏳ Server running on port $PORT... (Ctrl+C to stop)"
    
    # Wait for the server process
    wait $SERVER_PID
else
    echo "❌ Failed to start project server"
    exit 1
fi