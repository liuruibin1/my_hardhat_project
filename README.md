# my_hardhat_project
hardhat build

安装：

npm install --save-dev hardhat

初始化项目：

To create the sample project, run npx hardhat in your project folder:

终端输入：npx hardhat
![image](https://github.com/liuruibin1/my_hardhat_project/assets/68451339/4ac2a866-9df4-44c6-ab53-a9764a44bc70)

选择： create a typeScript project

生成文件：

contracts:存放合约文件夹

script：用于部署合约文件夹，存放doploy.ts

test:存放测试文件夹

hardhat.config.js：用于定义合约版本，部署的网络networks，还可以进行代理（上传源码时，若连接超时可以进行代理）

根据package.json分别进行，编译，打包，验证

1、编译

yarn compile

2、打包

yarn deploy-sepolia

3、验证

yarn verify-sepolia

