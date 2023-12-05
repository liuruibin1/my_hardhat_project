import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import { ethers } from "hardhat";

async function main() {
    const signers = await ethers.getSigners();
    console.log("Deploying contracts with the account:", signers[0].address);

    const Fai = await ethers.getContractFactory("FAI")

    const fai = await Fai.deploy({gasLimit: 5000000, gasPrice: 500000000000});

    await fai.deployed();

    console.log(fai.address);
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });