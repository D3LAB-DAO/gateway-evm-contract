// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract V8S {
    struct Project {
        string url;
    }

    struct Request {
        bytes data;
        uint projectId;
        bool hasResponse;
    }

    struct Response {
        bytes responseData;
        uint requestId;
    }

    mapping(uint => Project) public projects;
    mapping(uint => Request) public requests;
    mapping(uint => Response) public responses;
    mapping(uint => uint) public requestToResponse;

    uint public nextProjectId = 0;
    uint public nextRequestId = 0;
    uint public nextResponseId = 0;

    function addProject(string memory url) public returns (uint) {
        uint projectId = nextProjectId++;
        projects[projectId] = Project(url);
        return projectId;
    }

    function addRequest(
        uint projectId,
        bytes memory data
    ) public returns (uint) {
        uint requestId = nextRequestId++;
        requests[requestId] = Request(data, projectId, false);
        return requestId;
    }

    function addResponse(
        uint requestId,
        bytes memory responseData
    ) public returns (uint) {
        uint responseId = nextResponseId++;
        responses[responseId] = Response(responseData, requestId);
        requestToResponse[requestId] = responseId;
        requests[requestId].hasResponse = true;
        return responseId;
    }

    function getRequest(
        uint requestId
    ) public view returns (bytes memory, uint) {
        return (requests[requestId].data, requests[requestId].projectId);
    }

    function getResponse(
        uint requestId
    ) public view returns (bytes memory, uint) {
        uint responseId = requestToResponse[requestId];
        return (
            responses[responseId].responseData,
            responses[responseId].requestId
        );
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
