// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@uniswap/swap-router-contracts/contracts/interfaces/IV3SwapRouter.sol";

contract ESwap is PausableUpgradeable, ReentrancyGuardUpgradeable, UUPSUpgradeable, OwnableUpgradeable {
  IV3SwapRouter public swapRouter;

  address public wethAddress;

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() initializer {}

  function __e_swap_init(address _swapRouterAddress, address _wethAddress) public initializer {
    __Ownable_init();
    __Pausable_init();
    __ReentrancyGuard_init();
    __UUPSUpgradeable_init();
    swapRouter = IV3SwapRouter(_swapRouterAddress);
    wethAddress = _wethAddress;
  }

  uint24 public constant poolFee = 3000;

  function setSwapRouter(address swapRouterAddress) public onlyOwner {
    swapRouter = IV3SwapRouter(swapRouterAddress);
  }

  function setWETHAddress(address _wethAddress) public onlyOwner {
    wethAddress = _wethAddress;
  }

  function swapEtherToToken(address token, uint minAmount) public payable whenNotPaused returns (uint) {
    require(msg.value > 0, "Value must be greater than zero");

    IV3SwapRouter.ExactInputSingleParams memory params = IV3SwapRouter.ExactInputSingleParams({
      tokenIn: wethAddress,
      tokenOut: token,
      fee: poolFee,
      recipient: msg.sender,
      amountIn: msg.value,
      amountOutMinimum: minAmount,
      sqrtPriceLimitX96: 0
    });

    uint amountOut = swapRouter.exactInputSingle{ value: msg.value }(params);

    return amountOut;
  }

  function pause(bool value) public onlyOwner {
    if (value) {
      _pause();
    } else {
      _unpause();
    }
  }

  function implementationVersion() public pure returns (string memory) {
    return "1.0.0";
  }

  function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}
