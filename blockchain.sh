#!/bin/bash

# Configuration
EXPLORER_SCRIPT="explorer_server.js"
SERVICE_NAME="besu.service"

stop_stack() {
    echo "Stopping Besu Blockchain..."
    systemctl --user stop $SERVICE_NAME
    
    echo "Stopping Pro Explorer..."
    pkill -f "$EXPLORER_SCRIPT" 2>/dev/null
    
    echo "Stack is now OFF."
}

start_stack() {
    echo "Starting Besu Blockchain..."
    systemctl --user start $SERVICE_NAME
    
    # Wait a few seconds for Besu to initialize ports
    sleep 3
    
    echo "Spinning up Pro Explorer..."
    # Run explorer in background, redirect logs to avoid cluttering terminal
    nohup node "$EXPLORER_SCRIPT" > explorer.log 2>&1 &
    
    echo "Stack is now ON."
    echo "Node RPC: http://localhost:8545"
    echo "Explorer: http://localhost:3000"
}

# Check current status
if systemctl --user is-active --quiet $SERVICE_NAME; then
    echo "Current Status: ACTIVE"
    read -p "Do you want to STOP the blockchain and explorer? (y/n): " confirm
    if [[ $confirm == [yY] ]]; then
        stop_stack
    fi
else
    echo "Current Status: INACTIVE"
    read -p "Do you want to START the blockchain and explorer? (y/n): " confirm
    if [[ $confirm == [yY] ]]; then
        start_stack
    fi
fi
