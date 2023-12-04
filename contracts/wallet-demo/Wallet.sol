// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

// Uniswap V2 Router 接口
interface IUniswapV2Router {
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
}

contract Wallet {
    event Deposit(address indexed from, uint256 amount);
    event Withdrawal(address indexed to, uint256 amount);
    event TokenSwap(address indexed fromToken, address indexed toToken, uint256 fromAmount, uint256 toAmount);

    using SafeERC20 for IERC20;
    address public owner;
    IUniswapV2Router public uniswapRouter;

    constructor(address _uniswapRouter) {
        owner = msg.sender;
        uniswapRouter = IUniswapV2Router(_uniswapRouter);
    }

    // 存储以太币余额
    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    // 提现以太币到指定地址
    function withdraw(address payable to, uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient balance");

        to.transfer(amount);
        emit Withdrawal(to, amount);
    }

    // 提现指定代币到指定地址
    function withdrawToken(address tokenAddress, address to, uint256 amount) external onlyOwner {
        IERC20 token = IERC20(tokenAddress);
        require(token.balanceOf(address(this)) >= amount, "Insufficient token balance");
        token.transfer(to, amount);
    }

    // 获取以太币余额
    function getEtherBalance() external view returns (uint256) {
        return address(this).balance;
    }

    // 获取指定代币余额
    function getTokenBalance(address tokenAddress) external view returns (uint256) {
        IERC20 token = IERC20(tokenAddress);
        return token.balanceOf(address(this));
    }

    function swapTokens(
        address fromToken,
        address toToken,
        uint256 fromAmount,
        uint256 minToAmount
    ) external onlyOwner {
        IERC20 fromTokenContract = IERC20(fromToken);
        IERC20 toTokenContract = IERC20(toToken);

        require(fromTokenContract.balanceOf(address(this)) >= fromAmount, "Insufficient fromToken balance");

        // Approve Uniswap Router to spend fromToken
        fromTokenContract.approve(address(uniswapRouter), fromAmount);

        address[] memory path = new address[](2);
        path[0] = fromToken;
        path[1] = toToken;

        // Swap fromToken to toToken using Uniswap Router
        uniswapRouter.swapExactTokensForTokens(
            fromAmount,
            minToAmount,
            path,
            address(this),
            block.timestamp + 1800  // 30 minutes deadline
        );

        require(toTokenContract.balanceOf(address(this)) >= minToAmount, "Swap did not meet minimum expected amount");
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
}
