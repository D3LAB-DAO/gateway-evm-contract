const { ethers } = require("hardhat");
const ca = require("../config/contractAddrs.json");

const url = "https://raw.githubusercontent.com/v8s-layer/gateway-backend/main/examples/telegramAlarmBot.js";

let tx;

async function addProject() {
  const contract = await ethers.getContractAt("V8S", ca.v8s);

  tx = await contract.addProject(url);
  await tx.wait();
  console.log("tx hash:", tx.hash);

  const projectId = await contract.nextProjectId() - 1n;
  console.log("projectId:", projectId);
  console.log("projects:", await contract.projects(projectId));
}

addProject();