const hre = require("hardhat");

const {initializeLocalContract} = require("./initializer")

const CoinLocalAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
const CoinLocalAddress2 = '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512'

const getCoinDecimals = async () => {

    const contract1 = await initializeLocalContract(CoinLocalAddress)
    const decimals1 = await contract1.readContract.decimals();
    console.log(`Contrato 1: Numero de decimales: ${decimals1}`)

    const contract2 = await initializeLocalContract(CoinLocalAddress2)
    let decimals2 = await contract2.readContract.decimals();
    console.log(`Contrato 2: Numero de decimales: ${decimals2}`)

    await contract2.writeContract.setDecimals(8)
    decimals2 = await contract2.readContract.decimals();
    console.log(`Contrato 2 actualizado: Numero de decimales: ${decimals2}`)
}

//El objetivo es mostrar que varias instancias del mismo contrato deberian tener los mismos datos
const multipleContractInstances = async () => {
    //1- Creacion de las dos instancias del mismo contrato
    const contract1 = await initializeLocalContract(CoinLocalAddress2)
    const contract2 = await initializeLocalContract(CoinLocalAddress2)

    //2- Realizar la misma operacion de lectura en ambos
    let decimals1 = await contract1.readContract.decimals()
    console.log(`Decimals 1: ${decimals1}`)
    let decimals2 = await contract2.readContract.decimals()
    console.log(`Decimals 2: ${decimals2}`)

    //3- Realizar una operacion de escritura en una de las instancias
    await contract2.writeContract.setDecimals(12)

    //4- Realizar la misma lectura sobre ambos
    decimals1 = await contract1.readContract.decimals()
    console.log(`Decimals 1: ${decimals1}`)
    decimals2 = await contract2.readContract.decimals()
    console.log(`Decimals 2: ${decimals2}`)

}

multipleContractInstances()