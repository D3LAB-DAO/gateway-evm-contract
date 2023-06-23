const { ethers } = require("hardhat");
const ca = require("../config/contractAddrs.json");

let tx;

const inputParams = { "a": 5, "b": 3 };

function jsonToHexString(jsonObject) {
    const jsonString = JSON.stringify(jsonObject);
    const byteArray = new TextEncoder().encode(jsonString);

    let hexString = "0x";
    for (let i = 0; i < byteArray.length; i++) {
      hexString += byteArray[i].toString(16).padStart(2, "0");
    }

    return hexString;
}

async function addRequest() {
  const contract = await ethers.getContractAt("V8S", ca.v8s);

  tx = await contract.addRequest(0, jsonToHexString(inputParams));
  await tx.wait();
  console.log("tx hash:", tx.hash);
}

addRequest();