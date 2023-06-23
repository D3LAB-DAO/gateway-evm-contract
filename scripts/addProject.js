const { ethers } = require("hardhat");
const ca = require("../config/contractAddrs.json");

const url = "https://raw.githubusercontent.com/D3LAB-DAO/gateway-backend/main/examples/simple_addition.js";

let tx;

async function addProject() {
  const contract = await ethers.getContractAt("V8S", ca.v8s);

  tx = await contract.addProject(url);
  await tx.wait();
  console.log("tx hash:", tx.hash);
}

addProject();