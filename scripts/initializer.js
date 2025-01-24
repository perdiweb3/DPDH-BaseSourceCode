const hre = require("hardhat");

const CoinMetadataFile = require("../artifacts/contracts/ERC20.sol/KeepCodingCoin.json")

const CounterMetadataFile = require("../artifacts/contracts/Counter.sol/Counter.json")

const PROVIDER_URL = "https://polygon-amoy.g.alchemy.com/v2/lgWbt-rcdgnP1a3tL7W5GCKebQoFvth0"


const initializeLocalProvider = async() => {
    const provider = hre.ethers.provider
    return provider
}

const initializeLocalSigner = async() => {
    const provider = hre.ethers.provider
    // const signer = await hre.ethers.getSigners()
    const signer = new hre.ethers.Wallet('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', provider)
    return {provider, signer}
}

async function initializeLocalContract(contractAddress){
    const {provider, signer} = await initializeLocalSigner()
    const readContract = new hre.ethers.Contract(
        contractAddress, CoinMetadataFile.abi, hre.ethers.provider
    )
    const writeContract = readContract.connect(signer)
    return {provider, signer, readContract, writeContract}
}

async function initializeCounterAmoyContract(contractAddress){
    const provider = new hre.ethers.JsonRpcProvider(PROVIDER_URL)
    const counterReadContract = new hre.ethers.Contract(
        contractAddress,CounterMetadataFile.abi, provider
    )
    return {provider, counterReadContract}

}

module.exports = {initializeLocalContract, initializeCounterAmoyContract}