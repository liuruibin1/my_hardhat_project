import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import {BigNumber} from "ethers";
const { ethers } = require("hardhat");

async function main() {
    const signers = await ethers.getSigners();
    console.log("Deploying contracts with the account:", signers[0].address);
    console.log("Deploying contracts with the account:", (await signers[0].getBalance()).toString());

    const RuinToken = await ethers.getContractFactory("RuinToken")

    // 通过 ethers.provider 获取当前网络上的 gas 估算器
    const gasEstimate = await ethers.provider.estimateGas(RuinToken.getDeployTransaction(BigNumber.from(1000)));

    console.log("Estimated gas for deployment:", gasEstimate.toString());

    const ruinToken = await RuinToken.deploy(
        BigNumber.from(1000)
    );

    await ruinToken.deployed()

    console.log(ruinToken.address);
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });