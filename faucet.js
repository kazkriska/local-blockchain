const { ethers } = require("ethers");

// Configuration
const RPC_URL = "http://localhost:8545";
const PRIVATE_KEY = "0x96cabff6ef4d17e56803b09e808e7769cd0e5489757c6cb7dadca465a22dfe87"; // Validator account 0x29dbee...
const AMOUNT_ETH = "100.0";

async function main() {
    const args = process.argv.slice(2);
    if (args.length < 1) {
        console.log("Usage: node faucet.js <RECIPIENT_ADDRESS>");
        process.exit(1);
    }

    const recipient = args[0];
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    console.log(`Sending ${AMOUNT_ETH} ETH from ${wallet.address} to ${recipient}...`);

    try {
        const tx = await wallet.sendTransaction({
            to: recipient,
            value: ethers.parseEther(AMOUNT_ETH),
        });

        console.log(`Transaction sent! Hash: ${tx.hash}`);
        await tx.wait();
        console.log("Transaction confirmed.");
    } catch (error) {
        console.error("Error sending transaction:", error.message);
    }
}

main();
