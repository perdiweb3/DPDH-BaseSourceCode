// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CoinModule", (m)=>{
    const coin = m.contract(
        //Nombre del Contrato
        "Coin",
        //Parametros que recibe el constructor
        [
            5000,
            2,
            "KeepCodingCoin",
            "KCC"
        ]
    );

    return {coin};
} );