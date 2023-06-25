// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract V8S {
    struct Project {
        string url;
        string decodeType;
    }

    struct Request {
        bytes data;
        uint projectId;
        bool hasResponse;
        bytes responseData;
    }

    mapping(uint => Project) public projects;
    mapping(uint => Request) public requests;

    uint public nextProjectId = 0;
    uint public nextRequestId = 0;

    function addProject(string memory url, string memory decodeType) public returns (uint) {
        uint projectId = nextProjectId++;
        projects[projectId] = Project(url, decodeType);
        return projectId;
    }

    function addRequest(
        uint projectId,
        bytes memory data
    ) public returns (uint) {
        uint requestId = nextRequestId++;
        requests[requestId] = Request(data, projectId, false, "");
        return requestId;
    }

    function addResponse(
        uint requestId,
        bytes memory responseData
    ) public {
        requests[requestId].responseData = responseData;
        requests[requestId].hasResponse = true;
    }

    function getRequest(
        uint requestId
    ) public view returns (uint, string memory, bytes memory) {
        return (requests[requestId].projectId, projects[requests[requestId].projectId].decodeType, requests[requestId].data);
    }

    function getResponse(
        uint requestId
    ) public view returns (bytes memory) {
        return requests[requestId].responseData;
    }

    function isResponseExists(uint requestId) public view returns (bool) {
        return requests[requestId].hasResponse;
    }
    
    function getUnrespondedRequests() public view returns (uint[] memory) {
        uint[] memory unrespondedRequests = new uint[](nextRequestId);
        uint count = 0;
        for (uint i = 0; i < nextRequestId; i++) {
            if (!requests[i].hasResponse) {
                unrespondedRequests[count] = i;
                count++;
            }
        }
        uint[] memory result = new uint[](count);
        for (uint i = 0; i < count; i++) {
            result[i] = unrespondedRequests[i];
        }
        return result;
    }
}
