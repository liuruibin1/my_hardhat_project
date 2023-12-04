import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import {BigNumber} from "ethers";
const { ethers } = require("hardhat");

async function main() {
    const signers = await ethers.getSigners();
    console.log("Deploying contracts with the account:", signers[0].address);

    const FAI = await ethers.getContractFactory("FAI")

    const fai = await FAI.deploy();

    console.log(fai.address);
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });