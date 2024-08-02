# Eiger Swap


### Build on node version
```
node version 20
```

### Install Dependencies
Install all dependencies
```shell
yarn install
```

### Build Contracts
Run the build script to build all contracts
```shell
npx hardhat compile
```

### Test Contracts
```shell
npx hardhat compile
```

### Deployed Contract Address on sepolia
```
0x040b40650bE76Af4ee87CBef02549Ee32C04c7b7
```
### For deploying the contract to the network
```shell
npx hardhat run --network sepolia scripts/deploy_eiger_swap.ts
```

### For testing the contract to the network
```shell
npx hardhat run --network sepolia scripts/call_eiger_swap.ts
```

### Required .env params
```
ETHERSCAN_API_KEY=(Rptional)
RPC_URL=(Required for running the scripts)
FORK_RPC_URL=(Required for running the local test)
PRIVATE_KEY=(Required for running the scripts)
MMEMONIC=(Required for running the local test)
```
