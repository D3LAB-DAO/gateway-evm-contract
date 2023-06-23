const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("V8S", function () {

  let v8s;

  let nextProjectId = 0;
  let nextRequestId = 0;
  let nextResponseId = 0;

  const poolInfo = [
    {
      url: "https://raw.githubusercontent.com/D3LAB-DAO/gateway-backend/main/examples/simple_addition.js",
      inputParams: { "a": 5, "b": 3 }
    },
    {
      url: "https://raw.githubusercontent.com/D3LAB-DAO/gateway-backend/main/examples/circle_area.js",
      inputParams: { "a": 5, "b": 3 }
    },
    {
      url: "https://raw.githubusercontent.com/D3LAB-DAO/gateway-backend/main/examples/chat.js",
      inputParams: { "a": 5, "b": 3 }
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

    it("url1", async () => {
      expect(await v8s.nextProjectId()).to.equal(nextProjectId);

      await v8s.addProject(poolInfo[nextProjectId].url);

      let project = await v8s.projects(nextProjectId);
      expect(project).to.equal(poolInfo[nextProjectId].url);

      nextProjectId++;
      expect(await v8s.nextProjectId()).to.equal(nextProjectId);
    })
    it("url2", async () => {
      expect(await v8s.nextProjectId()).to.equal(nextProjectId);

      await v8s.addProject(poolInfo[nextProjectId].url);

      let project = await v8s.projects(nextProjectId);
      expect(project).to.equal(poolInfo[nextProjectId].url);

      nextProjectId++;
      expect(await v8s.nextProjectId()).to.equal(nextProjectId);
    })
    it("url3", async () => {
      expect(await v8s.nextProjectId()).to.equal(nextProjectId);

      await v8s.addProject(poolInfo[nextProjectId].url);

      let project = await v8s.projects(nextProjectId);
      expect(project).to.equal(poolInfo[nextProjectId].url);

      nextProjectId++;
      expect(await v8s.nextProjectId()).to.equal(nextProjectId);
    })
  })

  describe("Add Request", async () => {

    it("request1", async () => {
      let data = jsonToHexString(JSON.stringify(poolInfo[nextRequestId].inputParams));
      expect(await v8s.nextRequestId()).to.equal(nextRequestId);
      await v8s.addRequest(0, data);
      let request = await v8s.requests(nextRequestId);
      expect(request[0]).to.equal(data);
      nextRequestId++;
      expect(await v8s.nextRequestId()).to.equal(nextRequestId);
    })

    it("request2", async () => {
      let data = jsonToHexString(JSON.stringify(poolInfo[nextRequestId].inputParams));
      expect(await v8s.nextRequestId()).to.equal(nextRequestId);
      await v8s.addRequest(0, data);
      let request = await v8s.requests(nextRequestId);
      expect(request[0]).to.equal(data);
      nextRequestId++;
      expect(await v8s.nextRequestId()).to.equal(nextRequestId);
    })

    it("request2", async () => {
      let data = jsonToHexString(JSON.stringify(poolInfo[nextRequestId].inputParams));
      expect(await v8s.nextRequestId()).to.equal(nextRequestId);
      await v8s.addRequest(0, data);
      let request = await v8s.requests(nextRequestId);
      expect(request[0]).to.equal(data);
      nextRequestId++;
      expect(await v8s.nextRequestId()).to.equal(nextRequestId);
    })
  })

  describe("Add Response", async () => {

    it("response1", async () => {
      let responseData = jsonToHexString('{"result": 8}');
      expect(await v8s.nextResponseId()).to.equal(nextResponseId);
      await v8s.addResponse(0, responseData);
      let response = await v8s.responses(nextResponseId);
      expect(response.responseData).to.equal(responseData);
      nextResponseId++;
      expect(await v8s.nextResponseId()).to.equal(nextResponseId);
    })
  })

  describe("Is Response Exists", async () => {
    it("check", async () => {
      expect(await v8s.isResponseExists(0)).to.equal(true);
      expect(await v8s.isResponseExists(1)).to.equal(false);
    })
  })
})
