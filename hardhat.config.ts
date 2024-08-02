import { config as dotEnvConfig } from "dotenv"
import { HardhatUserConfig } from "hardhat/config"
import { BigNumber } from "ethers"
import "@nomiclabs/hardhat-etherscan"
import "@typechain/hardhat"
import "hardhat-gas-reporter"
import "solidity-coverage"
import "@nomicfoundation/hardhat-toolbox"
import "@nomiclabs/hardhat-ethers"
import "hardhat-contract-sizer"
import "hardhat-docgen"
import "@hardhat-docgen/core"
import "@hardhat-docgen/markdown"
import "@openzeppelin/hardhat-upgrades"

dotEnvConfig()

const mnemonic =
  process.env.PRIVATE_KEY !== undefined
    ? process.env.MMEMONIC
    : "comfort mouse tomato excite royal table plunge fog pitch slim tone erase"

const mnemonicAccounts = {
  mnemonic,
}

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.15",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
  docgen: {
    path: "./docs",
    clear: true,
    runOnCompile: false,
    except: ["/test/*", "/mock/*"],
  },
  networks: {
    hardhat: {
      forking: {
        url: process.env.FORK_RPC_URL !== undefined ? process.env.FORK_RPC_URL : "",
      },
      accounts: mnemonicAccounts,
    },
    ganache: {
      url: "http://localhost:8500",
      accounts: mnemonicAccounts,
      timeout: 60000,
      blockGasLimit: 60000000,
      gasPrice: BigNumber.from(1)
        .mul(10 ** 9)
        .toNumber(),
    },
    sepolia: {
      url: process.env.RPC_URL !== undefined ? process.env.RPC_URL : "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      timeout: 120000,
      blockGasLimit: 70000,
      gasPrice: BigNumber.from("70000000000").toNumber(),
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || "",
  },
}

export default config
