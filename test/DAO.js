const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");

  const hre = require("hardhat")

  describe("DAO Test Suite", function(){

    const decimals = 2
    const initialSupply = 50 * 10**decimals
    const name = "KeepCodingCoin"
    const symbol = "KCC"

    async function deployDAOFixture(){
        const [owner, otherAccount] = await ethers.getSigners();

        const Coin = await hre.ethers.getContractFactory("KeepCodingCoin")
        const coin = await Coin.deploy(decimals, initialSupply, name, symbol)

        const DAO = await hre.ethers.getContractFactory("KeepCodignDAO")
        const dao = await DAO.deploy(await coin.getAddress())

        //Damos fondos a la DAO para que pueda repartir las ganancias
        await coin.transferCoin(dao, 20 * 10**decimals)

        return {dao, owner, otherAccount, coin}
    }

    describe("Deployment", function(){

        it("Should set the initial values correct", async function(){
            const {dao, coin} = await loadFixture(deployDAOFixture)
            expect( await coin.balanceOf(dao)).to.equal(20 * 10**decimals)
        })
    })

    describe("Create Proposal", function(){

        const title = "TITULO"
        const desc = "Descripcion de la propuesta"
        it("Should assign the correct values to fields", async function(){
            const {dao, owner} = await loadFixture(deployDAOFixture)
            await expect( dao.createProposal(title, desc)).to.emit(
                dao,
                "ProposalCreated"
            ).withArgs(0,owner,title,desc)
            const proposal = await dao.proposals(0)
            expect(proposal.proposalId).to.equal(0)
            expect(proposal.title).to.equal(title)
            expect(proposal.description).to.equal(desc)
            expect(proposal.votesTrue).to.equal(0)
            expect(proposal.votesFalse).to.equal(0)
            expect(proposal.active).to.equal(true)
            expect(proposal.creator).to.equal(owner)
        })
    })

    describe("Vote Proposal", function(){

        const title = "TITULO"
        const desc = "Descripcion de la propuesta"

        it("Should emit TRUE vote", async function(){
            const {dao,owner} = await loadFixture(deployDAOFixture)
            await dao.createProposal(title, desc)
            await expect (dao.voteProposal(0, true)).to.emit(
                dao,
                "VoteEmitted"
            ).withArgs(0,owner)
            const proposal = await dao.proposals(0)
            expect(proposal.votesTrue).to.equal(1)
            expect(proposal.votesFalse).to.equal(0)
            // expect(proposal.voters.legnth).to.equal(1)
        })

        it("Should emit FALSE vote", async function(){
            const {dao, owner} = await loadFixture(deployDAOFixture)
            await dao.createProposal(title, desc)
            await expect (dao.voteProposal(0, false)).to.emit(
                dao,
                "VoteEmitted"
            ).withArgs(0,owner)
            const proposal = await dao.proposals(0)
            expect(proposal.votesTrue).to.equal(0)
            expect(proposal.votesFalse).to.equal(1)
            // expect(proposal.voters.legnth).to.equal(1)
        })

        it("Shoul not emit more than one vote per address", async function(){
            const {dao, owner} = await loadFixture(deployDAOFixture)
            await dao.createProposal(title, desc)
            await dao.voteProposal(0, false)
            await expect( dao.voteProposal(0,false)).to.be.revertedWithCustomError(
                dao,
                "UserAlreadyVotedThisProposal"
            ).withArgs(owner,0)//voter y proposalId
        })
    })

    describe("Execute Proposal", async function(){

        it("Should execute the proposal after deadline is fullfilled", async function(){
            const {dao, coin} = await loadFixture(deployDAOFixture);
            const daoBalance = await coin.balanceOf(dao)
            await dao.createProposal("T","d")
            await time.increase(5 * 60) //5 minutos en segundos
            await dao.executeProposal(0)
            const proposal = await dao.proposals(0)
            expect( await coin.balanceOf(proposal.receiver)).to.equal(proposal.reward)
            expect( await coin.balanceOf(dao)).to.equal(daoBalance - proposal.reward)
            expect(proposal.active).to.equal(false)
        })

        it("Should revert when the proposal deadline is not fullfilled", async function(){
            const {dao} = await loadFixture(deployDAOFixture);
            await dao.createProposal("T","d")
            await expect( dao.executeProposal(0)).to.be.revertedWithCustomError(
                dao,
                "ProposalNotReadyToBeExecuted" 
            ).withArgs(0)
        })
        
    })
  })