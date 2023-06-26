const { ethers } = require("hardhat");

async function main() {
  const deployer = (await ethers.getSigners())[0];
  console.log("deployer address: ", deployer.address);

  const v8c = await ethers.deployContract("V8S");
  await v8c.waitForDeployment();

  console.log("v8c", await v8c.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
// 0xFc6256A220AF6F544719bcc5deE58F6BF5CafD8b