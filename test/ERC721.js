const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");

  const hre = require("hardhat")

  describe("ERC721 Test Suite", function(){

    const name = "KeepCodingProduct"
    const symbol = "KCP"
    const baseURI = "https://keepcodingproduct"

    async function deployERC721Fixture(){

        const [owner, otherAccount] = await ethers.getSigners()

        const Product = await hre.ethers.getContractFactory("KeepCodingProduct")
        const product = await Product.deploy(
            name, symbol, baseURI
        )

        return {product, owner, otherAccount}
    }

    describe("Deployment", function(){

        it("Should set the right name and symbol", async function(){
            const {product} = await loadFixture(deployERC721Fixture)
            expect( await product.name()).to.equal(name)
            expect( await product.symbol()).to.equal(symbol)
        })

        it("Should set the right baseURI", async function(){
            const {product} = await loadFixture(deployERC721Fixture)
            expect( await product.baseURI()).to.equal(baseURI)
        })
    })

    describe("Mint", function(){

        it("Should give the new token to the owner", async function(){
            const {product, owner} = await loadFixture(deployERC721Fixture)
            await product.mintNewProduct()
            expect( await product.ownerOf(1)).to.equal(owner)
        })

        it("Should the owner have the right balance", async function(){
            const {product, owner} = await loadFixture(deployERC721Fixture)
            await product.mintNewProduct()
            expect( await product.balanceOf(owner)).to.equal(1)
        })
        
    })
  })