#!/bin/bash

show_status() {
    echo "--- Besu Node Status ---"
    systemctl --user status besu.service | grep Active
    echo -n "Current Block Number: "
    curl -s -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' http://localhost:8545 | grep -oP '(?<="result":")[^"]+' | xargs printf "%d\n" 2>/dev/null || echo "Error connecting to node"
    echo -n "Node Address: "
    curl -s -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":1}' http://localhost:8545 | grep -oP '(?<="result":")[^"]+' || echo "0x29dbee38a39f546a41dffb698ba212a1ef61f1a0"
    echo "------------------------"
}

while true; do
    show_status
    echo ""
    echo "Select an option:"
    echo "(1) Send 100 ETH (Faucet)"
    echo "(2) Create New Wallet"
    echo "(3) Check Wallet Balance"
    echo "(4) Launch Block Explorer (Web UI)"
    echo "(5) Refresh Status"
    echo "(q) Quit"
    echo ""
    read -p "Option: " choice

    case $choice in
        1)
            read -p "Enter recipient address: " address
            if [[ $address =~ ^0x[a-fA-F0-9]{40}$ ]]; then
                node faucet.js "$address"
            else
                echo "Invalid Ethereum address format."
            fi
            ;;
        2)
            node create_wallet.js
            ;;
        3)
            read -p "Enter wallet address: " address
            if [[ $address =~ ^0x[a-fA-F0-9]{40}$ ]]; then
                node get_balance.js "$address"
            else
                echo "Invalid Ethereum address format."
            fi
            ;;
        4)
            echo "Starting Block Explorer at http://localhost:3000..."
            echo "Press Ctrl+C to stop the explorer and return to menu."
            node explorer_server.js
            ;;
        5)
            clear
            ;;
        q|Q)
            echo "Exiting..."
            exit 0
            ;;
        *)
            echo "Invalid option."
            ;;
    esac
    echo ""
    read -p "Press Enter to continue..."
    clear
done
