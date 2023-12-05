import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import { ethers } from "hardhat";

async function main() {
    const signers = await ethers.getSigners();
    console.log("Deploying contracts with the account:", signers[0].address);

    const FaiReceiver = await ethers.getContractFactory("FaiReceiver")

    const faiReceiver = await FaiReceiver.deploy({ gasLimit: 5000000 });

    await faiReceiver.deployed();

    console.log(faiReceiver.address);
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });