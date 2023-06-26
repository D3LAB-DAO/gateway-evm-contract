// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract V8S {
    struct Project {
        string url;
        string decodeType;
    }

    struct Request {
        bytes data;
        uint256 projectId;
        bool hasResponse;
        bytes responseData;
    }

    mapping(uint256 => Project) public projects;
    mapping(uint256 => Request) public requests;

    uint256 public nextProjectId = 0;
    uint256 public nextRequestId = 0;

    function addProject(
        string memory url,
        string memory decodeType
    ) public returns (uint256) {
        uint256 projectId = nextProjectId++;
        projects[projectId] = Project(url, decodeType);
        return projectId;
    }

    function addRequest(
        uint256 projectId,
        bytes memory data
    ) public returns (uint256) {
        uint256 requestId = nextRequestId++;
        requests[requestId] = Request(data, projectId, false, "");
        return requestId;
    }

    function addResponse(uint256 requestId, bytes memory responseData) public {
        requests[requestId].responseData = responseData;
        requests[requestId].hasResponse = true;
    }

    function getRequest(
        uint256 requestId
    ) public view returns (uint256, string memory, bytes memory) {
        return (
            requests[requestId].projectId,
            projects[requests[requestId].projectId].decodeType,
            requests[requestId].data
        );
    }

    function getResponse(uint256 requestId) public view returns (bytes memory) {
        return requests[requestId].responseData;
    }

    function isResponseExists(uint256 requestId) public view returns (bool) {
        return requests[requestId].hasResponse;
    }

    function getUnrespondedRequests() public view returns (uint256[] memory) {
        uint256[] memory unrespondedRequests = new uint256[](nextRequestId);
        uint256 count = 0;
        for (uint256 i = 0; i < nextRequestId; i++) {
            if (!requests[i].hasResponse) {
                unrespondedRequests[count] = i;
                count++;
            }
        }
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = unrespondedRequests[i];
        }
        return result;
    }
}
