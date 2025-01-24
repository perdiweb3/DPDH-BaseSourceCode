const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");

  const hre = require("hardhat")

  describe("Counter Test Suite", function(){

    async function deployCounterFixture(){

        const [owner, otherAccount] = await hre.ethers.getSigners()

        const Counter = await hre.ethers.getContractFactory("Counter")
        const counter = await Counter.deploy()
        return {counter, owner, otherAccount}
    }

    describe("Deployment", function(){
        it("Should initialize the right initial value", async function(){
            const {counter} = await loadFixture(deployCounterFixture)
            expect( await counter.getCounter()).to.equal(0)
        })
    })

    describe("Increment", function(){
        it("Should increment one time", async function(){
            const {counter} = await loadFixture(deployCounterFixture)
            await counter.increment()
            expect( await counter.getCounter()).to.equal(1)
        })

        it("Should increment two times", async function(){
            const {counter} = await loadFixture(deployCounterFixture)
            await counter.increment()
            await counter.increment()
            expect( await counter.getCounter()).to.equal(2)
        })
    })
  })