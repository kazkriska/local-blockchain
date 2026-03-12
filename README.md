# Local Besu Private Blockchain

A fully configured, private Ethereum-compatible blockchain environment powered by **Hyperledger Besu 25.12.0** using the **QBFT (Quorum Byzantine Fault Tolerance)** consensus mechanism.

## 🚀 Features

- **Automated Block Production:** Pre-configured 2-second block times.
- **Persistent Service:** Runs as a `systemd` user-level service for high availability.
- **Interactive Management:** One-stop-shop management via the `node_info.sh` script.
- **Built-in Faucet:** Instantly fund any wallet with 1 ETH.
- **Pro Block Explorer:** Modern, React-based Web UI to visualize blocks, transactions, and addresses.
- **Wallet Utilities:** Easy wallet creation and balance checking.

---

## 🛠 Getting Started

### 1. Prerequisites
The environment is already pre-configured with:
- **Node.js v24+**
- **Java 21** (Required by Besu)
- **Ethers.js v6** (Installed in the workspace)

### 2. Starting the Node
The node is configured to run as a background service. If it isn't already running, you can manage it using standard systemd commands:

```bash
# Start the node
systemctl --user start besu.service

# Check logs
journalctl --user -u besu.service -f
```

### 3. Using the Interactive Controller
The primary way to interact with your blockchain is through the interactive dashboard:

```bash
./node_info.sh
```

**Options inside the dashboard:**
1.  **Send 1 ETH (Faucet):** Input an address to instantly send 1 ETH from the validator's pre-funded account.
2.  **Create New Wallet:** Generates a new random Ethereum address and its private key.
3.  **Check Wallet Balance:** Query the current ETH balance of any address on the network.
4.  **Launch Block Explorer:** Starts the Web UI server.
5.  **Refresh Status:** Updates the current block height and network status.

## 🌐 Block Explorers

### 1. Pro Explorer (Built-in)
A lightweight React-based explorer for quick checks.
- Run `./node_info.sh` and select **Option 4**.
- Visit `http://localhost:3000`.

### 2. Blockscout (Advanced)
A professional-grade explorer with full indexing, token support, and smart contract verification.
- **Requirements:** Docker and Docker Compose installed.
- **Launch:**
  ```bash
  docker-compose up -d
  ```
- **Access:** `http://localhost:3001`
- **Stop:** `docker-compose down`

---

## 📂 Project Structure

- `/besu/`: The Hyperledger Besu binary and libraries.
- `/network/config/`:
    - `genesis.json`: The network definition and pre-funded accounts.
    - `besu.config`: The main node configuration (RPC, CORS, QBFT).
- `node_info.sh`: The main interactive CLI controller.
- `faucet.js`: Logic for signing and sending 1 ETH transactions.
- `explorer_server.js` & `index.html`: The Block Explorer backend and frontend.
- `create_wallet.js` & `get_balance.js`: Utility scripts for wallet management.

---

## 🔑 Technical Details

- **Chain ID:** 1337
- **RPC Endpoint:** `http://localhost:8545`
- **WebSocket Endpoint:** `http://localhost:8546`
- **Validator Address:** `0x29dbee38a39f546a41dffb698ba212a1ef61f1a0`
- **Block Period:** 2 Seconds
- **Gas Price:** 0 (Feel free to send transactions with 0 gas price)

---

## ⚠️ Security Note
This is a **private development environment**. The private keys used by the faucet and validator are stored in plain text (`network/data/key` and inside `faucet.js`). Never use these keys or this configuration on a public or production network.
