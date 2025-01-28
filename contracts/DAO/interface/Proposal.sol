// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

interface KeepCodingProposal {
    
    //Struct utilizado para crear, almacenar y devolver la informacion de cada propuesta
    struct Proposal{
        uint256 proposalId;
        string title;
        string description;
        uint256 votesTrue;
        uint256 votesFalse;
        bool active;
    }
}