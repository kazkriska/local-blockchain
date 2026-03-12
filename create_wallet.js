const { ethers } = require("ethers");

function main() {
    const wallet = ethers.Wallet.createRandom();
    
    console.log("--- New Ethereum Wallet ---");
    console.log(`Address:     ${wallet.address}`);
    console.log(`Private Key: ${wallet.privateKey}`);
    console.log("---------------------------");
    console.log("WARNING: Keep your private key safe. Do not share it with anyone.");
}

main();
