// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {KeepCodingProposal} from "./interface/Proposal.sol";
import {Counter} from "../Counter.sol";
import {IKeepCodingCoin} from  "../Interfaces/IERC20.sol";
import "hardhat/console.sol";

contract KeepCodignDAO is KeepCodingProposal, Counter{

    IKeepCodingCoin coin;

    mapping(uint256 => Proposal) public proposals;

    constructor(address _ERC20Address){
        coin = IKeepCodingCoin(_ERC20Address);
    }

    event ProposalCreated(uint256 indexed _proposalId, address indexed _creator, string _title, string _desc);
    event VoteEmitted(uint256 indexed _proposalId, address indexed _voter);
    event ProposalVotationApproved(uint256 indexed _proposalId);
    event ProposalVotationRejected(uint256 indexed _proposalId);
    event ProposalExecutedSuccesfully(uint256 indexed _proposalId, address _receiver, uint256 _amount);

    error UserAlreadyVotedThisProposal(address _voter, uint256 _proposalId);
    error ProposalDeadlineExceeded(uint256 _proposalId);
    error ProposalNotReadyToBeExecuted(uint256 _proposalId);

    modifier checkAddressHasVoted(address _voter ,uint256 _proposalId){
        if(proposals[_proposalId].voters[_voter]){
            revert UserAlreadyVotedThisProposal(_voter, _proposalId);
        }
        _;
    }

    modifier isProposalActive(uint256 _proposalId){
        if(proposals[_proposalId].deadline < block.timestamp){
            revert ProposalDeadlineExceeded(_proposalId);
        }
        _;
    }

    function createProposal(string memory _title, string memory _desc) public{
        uint256 externalCounter = getCounter();
        Proposal storage proposal = proposals[externalCounter]; 
        proposal.proposalId = externalCounter;
        proposal.title = _title;
        proposal.description = _desc;
        proposal.active = true;
        proposal.creator = msg.sender;
        proposal.deadline = block.timestamp + 5 minutes;

        proposal.reward = 100;
        proposal.receiver = address(0x70997970C51812dc3A010C7d01b50e0d17dc79C8);

        emit ProposalCreated(externalCounter, msg.sender, _title, _desc);

        increment();
    }

    // function getProposal(uint256 _proposalId) public view returns (Proposal memory){
    //     return proposals[_proposalId];
    // }

    function voteProposal(uint256 _proposalId, bool _vote) public isProposalActive(_proposalId) checkAddressHasVoted(msg.sender, _proposalId){
        if(_vote){
            proposals[_proposalId].votesTrue++;
        }else{
            proposals[_proposalId].votesFalse++;
        }   
        proposals[_proposalId].voters[msg.sender] = true;
        emit VoteEmitted( _proposalId, msg.sender);
    }

    function executeProposal(uint256 _proposalId) public{
        //Solo pueden ejecutarse propuestas que ya han terminado
        if(proposals[_proposalId].deadline < block.timestamp){
            if(proposals[_proposalId].votesTrue >=  proposals[_proposalId].votesFalse){
                emit ProposalVotationApproved(_proposalId);
                coin.transferCoin(proposals[_proposalId].receiver, proposals[_proposalId].reward);
                emit ProposalExecutedSuccesfully(_proposalId, proposals[_proposalId].receiver, proposals[_proposalId].reward);
            }else{
                emit ProposalVotationRejected(_proposalId);
            }
            proposals[_proposalId].active = false;
        }else{
            revert ProposalNotReadyToBeExecuted(_proposalId);
        }
    }
}