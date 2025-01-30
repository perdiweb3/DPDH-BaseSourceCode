const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");

  const hre = require("hardhat");

  describe("ERC20 Test Suite", function() {

    const decimals = 2
    const initialSupply = 50 * 10**decimals
    const name = "KeepCodingCoin"
    const symbol = "KCC"

    async function deployERC20Fixture(){

        const [owner, otherAccount] = await ethers.getSigners();

        const Coin = await hre.ethers.getContractFactory("KeepCodingCoin")
        const coin = await Coin.deploy(
            decimals, initialSupply, name, symbol
        )

        return {coin, owner, otherAccount}
    }

    describe("Deployment", function(){

        it("Should set the right decimals", async function(){
            const {coin} = await loadFixture(deployERC20Fixture)
            expect( await coin.decimals()).to.equal(decimals)
        })
    })

    describe("Mint", function(){

        it("Should mint the right amount to the right address", async function(){
            const {coin, otherAccount} = await loadFixture(deployERC20Fixture);
            await coin.connect(otherAccount).mintNewCoin();
            expect(await coin.balanceOf(otherAccount)).to.equal(1*10**decimals)
        })
    })

    describe("Transfer", function(){

        it("Balance after transfer should be correct", async function(){
            const {coin,owner,otherAccount} = await loadFixture(deployERC20Fixture)
            expect( await coin.balanceOf(owner)).to.equal(initialSupply)
            expect( await coin.balanceOf(otherAccount)).to.equal(0)
            await coin.transferCoin(otherAccount, 30 * 10**decimals)
            expect( await coin.balanceOf(owner)).to.equal(20 * 10**decimals)
            expect( await coin.balanceOf(otherAccount)).to.equal(30 * 10**decimals)
        })
    })
  })