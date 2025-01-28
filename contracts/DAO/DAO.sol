// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {KeepCodingProposal} from "./interface/Proposal.sol";
import {Counter} from "../Counter.sol";

contract KeepCodignDAO is KeepCodingProposal, Counter{

    uint256 public counter;

    mapping(uint256 => Proposal) public proposals;

    constructor(){
        counter = 1;
    }

    function createProposal(string memory _title, string memory _desc) public{
        Proposal storage proposal = proposals[counter]; 
        proposal.proposalId = counter;
        proposal.title = _title;
        proposal.description = _desc;
        proposal.active = true;

        counter++;
    }

    function getProposal(uint256 _proposalId) public view returns (Proposal memory){
        return proposals[_proposalId];
    }
}