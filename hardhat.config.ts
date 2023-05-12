import * as dotenv from "dotenv";
import type { HardhatUserConfig } from "hardhat/config";
require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-verify");

dotenv.config();

const { ProxyAgent, setGlobalDispatcher } = require("undici")

const proxyAgent = new ProxyAgent("http://127.0.0.1:7890")
setGlobalDispatcher(proxyAgent)
const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    etherscan: {
        // Your API key for Etherscan
        // Obtain one at [https://etherscan.io/](https://etherscan.io/)
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
    solidity: {
        compilers: [{version: "0.8.17", settings: {}}],
    },
    networks: {
        hardhat: {},
        sepolia: {
            url: process.env.ROPSTEN_URL,
            accounts: [process.env.PRIVATE_KEY],
        },
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    },
    mocha: {
        timeout: 40000
    }
};
export default config;