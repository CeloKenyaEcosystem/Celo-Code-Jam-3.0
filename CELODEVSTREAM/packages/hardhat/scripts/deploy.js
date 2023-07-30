const { ethers } = require('hardhat');

async function main() {
  // Load the marketplace contract artifacts
  const CelodevsDetailsFactory = await ethers.getContractFactory(
    'CelodevsDetails'
  );

  // Deploy the contract
  const CelodevsDetailsContract = await CelodevsDetailsFactory.deploy();

  // Wait for deployment to finish
  await CelodevsDetailsContract.deployed();

  // Log the address of the new contract
  console.log(
    'Celodevs Details deployed to:',
    CelodevsDetailsContract.address
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
