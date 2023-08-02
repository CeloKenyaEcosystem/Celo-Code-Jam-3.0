const hre = require("hardhat");

async function main() {
  const SupplyChainTracking = hre.ethers.getContractFactory("SupplyChainTracking");
  const supplyChainTracking = await SupplyChainTracking.deploy();

  await supplyChainTracking.deployed();

  console.log(`Contract deployed to ${supplyChainTracking.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});