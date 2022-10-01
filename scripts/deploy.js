
const hre = require("hardhat");

async function main() {
  const Punk= await hre.ethers.getContractFactory("punkNft");
  const punks= await Punk.deploy();

  await punks.deployed();

  console.log(
    ` deployed to ${punks.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
