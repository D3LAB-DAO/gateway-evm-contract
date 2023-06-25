const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("V8S", function () {

  let v8s;

  const poolInfo = [
    {
      url: "https://raw.githubusercontent.com/D3LAB-DAO/gateway-backend/main/examples/simple_addition.js",
      inputParams: { "a": 5, "b": 3 },
      decodeType: "address,uint256"
    },
    {
      url: "https://raw.githubusercontent.com/D3LAB-DAO/gateway-backend/main/examples/circle_area.js",
      inputParams: { "a": 5, "b": 3 },
      decodeType: "address,uint256"
    },
    {
      url: "https://raw.githubusercontent.com/D3LAB-DAO/gateway-backend/main/examples/chat.js",
      inputParams: { "a": 5, "b": 3 },
      decodeType: "address,uint256"
    }
  ]

  function jsonToHexString(jsonObject) {
      const jsonString = JSON.stringify(jsonObject);
      const byteArray = new TextEncoder().encode(jsonString);

      let hexString = "0x";
      for (let i = 0; i < byteArray.length; i++) {
        hexString += byteArray[i].toString(16).padStart(2, "0");
      }

      return hexString;
  }

  before(async () => {
    const V8S = await ethers.getContractFactory("V8S");
    v8s = await V8S.deploy();
  })

  describe("Add Project", async () => {
    for(let i = 0; i < poolInfo.length; i++) {
      it(`url${i+1}`, async () => {
        expect(await v8s.nextProjectId()).to.equal(i);
        await v8s.addProject(poolInfo[i].url, poolInfo[i].decodeType);
        let project = await v8s.projects(i);
        expect(project.url).to.equal(poolInfo[i].url);
        expect(project.decodeType).to.equal(poolInfo[i].decodeType);
      })
    }
  })

  describe("Add Request", async () => {
    for(let i = 0; i < poolInfo.length; i++) {
      it(`request${i+1}`, async () => {
        let data = jsonToHexString(JSON.stringify(poolInfo[i].inputParams));
        expect(await v8s.nextRequestId()).to.equal(i);
        await v8s.addRequest(i, data);
        let request = await v8s.requests(i);
        expect(request.data).to.equal(data);
        expect(request.hasResponse).to.equal(false);
      })
    }
  })

  describe("Add Response", async () => {
    it("response1", async () => {
      let responseData = jsonToHexString('{"result": 8}');
      await v8s.addResponse(0, responseData);
      let request = await v8s.requests(0);
      expect(request.responseData).to.equal(responseData);
      expect(request.hasResponse).to.equal(true);
    })
  })

  describe("Is Response Exists", async () => {
    it("check", async () => {
      expect(await v8s.isResponseExists(0)).to.equal(true);
      expect(await v8s.isResponseExists(1)).to.equal(false);
    })
  })
})
