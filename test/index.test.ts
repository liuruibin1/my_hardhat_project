import { expect, use } from "chai";
import { ethers } from "hardhat";
import {
    deployContract,
    MockProvider,
    solidity,
} from "ethereum-waffle";
import ERC20USDT from "../build/RuinToken.json";
import { Contract, Wallet } from "ethers";

use(solidity);

describe("RuinToken", function () {
    let wallet: Wallet;
    let RuinToken: Contract;
    let owner: string;
    beforeEach(async () => {
        [wallet] = new MockProvider().getWallets();
        RuinToken = await deployContract(wallet, ERC20USDT, [ethers.parseEther("1000")]);
    })
    it("name/symbol/totalSupply", async function () {
        console.log("token address::", RuinToken.getAddress);
        owner = await RuinToken.owner();
        const name = await RuinToken.name();
        const symbol = await RuinToken.symbol();
        const totalSupply = await RuinToken.totalSupply();
        console.log("owner::", owner)
        console.log("name::", name)
        console.log("symbol::", symbol);
        console.log("totalSupply::", totalSupply.toString());
        console.log("RUIN balance::", ethers.utils.formatEther(await RuinToken.balanceOf(wallet.address)).toString());
    });

    it("exchange", async function () {
        await RuinToken.transfer(RuinToken.address, ethers.utils.parseEther("10"))
        await RuinToken.approve(owner, ethers.utils.parseEther("1000"));
        await RuinToken.transferFrom(wallet.address, RuinToken.address, ethers.utils.parseEther("10"));
        console.log("my balance::", ethers.utils.formatEther(await RuinToken.balanceOf(wallet.address)).toString());
        console.log("contract balance::", ethers.utils.formatEther(await RuinToken.balanceOf(RuinToken.address)).toString())
    })
});