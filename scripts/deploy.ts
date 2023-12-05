import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import {BigNumber} from "ethers";
const { ethers } = require("hardhat");

async function main() {
    const signers = await ethers.getSigners();
    console.log("Deploying contracts with the account:", signers[0].address);

    const RuinToken = await ethers.getContractFactory("RuinToken")

    const ruinToken = await RuinToken.deploy(
        BigNumber.from(1000),{ gasLimit: 5000000 }
    );

    console.log(ruinToken.address);
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });