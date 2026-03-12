const { ethers } = require("ethers");

// Configuration
const RPC_URL = "http://localhost:8545";
const PRIVATE_KEY = "0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63"; // Pre-funded account 0xfe3b55...
const AMOUNT_ETH = "1.0";

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
        const network = await provider.getNetwork();
        const tx = await wallet.sendTransaction({
            to: recipient,
            value: ethers.parseEther(AMOUNT_ETH),
            gasLimit: 21000,
            gasPrice: 1000000000, // 1 Gwei
            chainId: network.chainId,
        });

        console.log(`Transaction sent! Hash: ${tx.hash}`);
        await tx.wait();
        console.log("Transaction confirmed.");
    } catch (error) {
        console.error("Error sending transaction:", error.message);
    }
}

main();
