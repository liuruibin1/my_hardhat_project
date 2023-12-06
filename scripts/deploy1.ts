import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import { ethers } from "hardhat";

async function main() {
    const signers = await ethers.getSigners();
    console.log("Deploying contracts with the account:", signers[0].address);

    const Fai = await ethers.getContractFactory("FAI")

    // 通过 ethers.provider 获取当前网络上的 gas 估算器
    const gasEstimate = await ethers.provider.estimateGas(Fai.getDeployTransaction());

    console.log("Estimated gas for deployment:", gasEstimate.toString());

    const fai = await Fai.deploy({gasLimit: 7500000});

    await fai.deployed();

    console.log(fai.address);
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });