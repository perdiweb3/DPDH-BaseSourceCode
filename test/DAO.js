const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");

  const hre = require("hardhat")

  describe("DAO Test Suite", function(){

    async function deployDAOFixture(){
        const [owner, otherAccount] = await ethers.getSigners();

        const DAO = await hre.ethers.getContractFactory("KeepCodignDAO")
        const dao = await DAO.deploy()

        return {dao, owner, otherAccount}
    }

    describe("Deployment", function(){

        it("Should set the correct counter value", async function(){
            const {dao} = await loadFixture(deployDAOFixture)
            expect ( await dao.counter()).to.equal(1)
        })
    })

    describe("Create Proposal", function(){

        const title = "TITULO"
        const desc = "Descripcion de la propuesta"
        it("Should assign the correct values to fields", async function(){
            const {dao} = await loadFixture(deployDAOFixture)
            await dao.createProposal(title, desc)
            const proposal = await dao.proposals(0)
            expect(proposal.proposalId).to.equal(0)
            expect(proposal.title).to.equal(title)
            expect(proposal.description).to.equal(desc)
            expect(proposal.votesTrue).to.equal(0)
            expect(proposal.votesFalse).to.equal(0)
            expect(proposal.active).to.equal(true)
        })
    })
  })