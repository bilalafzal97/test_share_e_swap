import { ethers, upgrades } from "hardhat";
import {
    EigerSwap,
    EigerSwap__factory
} from "../typechain";

async function main() {

    const swapRouterAddress = "0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E";
    const wethAddress = "0xfff9976782d46cc05630d1f6ebab18b2324d6b14";

    let eigerSwapFactory: EigerSwap__factory = await ethers.getContractFactory("EigerSwap");
    let eigerSwap = (await upgrades.deployProxy(eigerSwapFactory, [swapRouterAddress, wethAddress], {
        initializer: "__eiger_swap_init",
        kind: "uups"
    })) as unknown as EigerSwap;

    await eigerSwap.deployed();

    console.log("Eiger Swap Address: ", eigerSwap.address);


    console.log(await eigerSwap.owner())
    console.log(await eigerSwap.paused())
    console.log(await eigerSwap.swapRouter())
    console.log(await eigerSwap.wethAddress())
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});