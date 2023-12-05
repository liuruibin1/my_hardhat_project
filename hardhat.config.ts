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
        // apiKey: process.env.ETHERSCAN_API_KEY,   //以太坊主网验证用api key
        apiKey: { bsc: process.env.BSCRSCAN_API_KEY},
    },
    solidity: {
        compilers: [{version: "0.8.10", settings: {}}],
    },
    networks: {
        hardhat: {},
        sepolia: {
            url: process.env.ROPSTEN_URL,
            accounts: [process.env.PRIVATE_KEY],
        },
        bscTestnet: {
            url: "https://data-seed-prebsc-2-s1.bnbchain.org:8545", // BSC 测试网络节点 URL
            chainId: 97, // BSC 测试网络的 Chain ID
            accounts: ["you private key"] // 测试网络账户的私钥
        },
        bsc: {
            url: "https://bsc-dataseed1.bnbchain.org", // BSC 正式网络节点 URL
            chainId: 56, // BSC 测试网络的 Chain ID
            accounts: ["you private key"] // 正式网络账户的私钥
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