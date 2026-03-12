const { ethers } = require("ethers");

const RPC_URL = "http://localhost:8545";

async function main() {
    const args = process.argv.slice(2);
    if (args.length < 1) {
        console.log("Usage: node get_balance.js <ADDRESS>");
        process.exit(1);
    }

    const address = args[0];
    const provider = new ethers.JsonRpcProvider(RPC_URL);

    try {
        const balance = await provider.getBalance(address);
        console.log(`--- Wallet Balance ---`);
        console.log(`Address: ${address}`);
        console.log(`Balance: ${ethers.formatEther(balance)} ETH`);
        console.log(`----------------------`);
    } catch (error) {
        console.error("Error fetching balance:", error.message);
    }
}

main();
