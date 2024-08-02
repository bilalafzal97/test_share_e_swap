import { ethers, upgrades } from "hardhat";
import {
    EigerSwap,
    EigerSwap__factory
} from "../typechain";

async function main() {

    const eigerSwapAddress = "0x040b40650bE76Af4ee87CBef02549Ee32C04c7b7";
    const usdcAddress = "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8";

    let eigerSwapFactory: EigerSwap__factory = await ethers.getContractFactory("EigerSwap");
    let eigerSwap: EigerSwap = eigerSwapFactory.attach(eigerSwapAddress);

    let swapTx = await eigerSwap.swapEtherToToken(usdcAddress, 1.5 * 1000000, {
        value: ethers.utils.parseEther("0.001"),
    })

    await swapTx.wait()

    console.log(swapTx)

}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});