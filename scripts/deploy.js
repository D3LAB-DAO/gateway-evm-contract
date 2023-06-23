const { ethers } = require("hardhat");

async function main() {
  const v8c = await ethers.deployContract("V8S");
  await v8c.waitForDeployment();

  console.log("v8c", await v8c.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
