const hre = require("hardhat");

const {initializeCounterAmoyContract} = require("./initializer")

const CounterAmoyAddress = "0x14292c3ca70dc6f679B79D8521FD36d722EDFcc6"

//Escuchar eventos en tiempo real
const listenIncrementEvents = async () => {
    const {counterReadContract} = await initializeCounterAmoyContract(CounterAmoyAddress)
    console.log("Listen Increment Events")
    counterReadContract.on("Increment",(_value, _by, event) => {
        console.log(`Evento recibido. Param1: ${_value}, Param2: ${_by}, Event: ${event}`)
    })
    console.log("Event listener close")
}

const listenAllEvents = async () =>{
    const {counterReadContract} = await initializeCounterAmoyContract(CounterAmoyAddress)
    console.log("Listen All Events")
    await counterReadContract.on("*",(_event) => {
        console.log(_event.log)
        console.log(`Evento recibido-> Name: ${_event.log.fragment.name}. Value: ${_event.log.args[0]}. Caller: ${_event.log.args[1]}.`)
    })
    console.log("Event Listener Closed Succesfully!")
}

const getEventLogs = async () => {
    console.log("Get Event Logs")
    const {counterReadContract} = await initializeCounterAmoyContract(CounterAmoyAddress)
    //para no pasar un filtro a algun parametro concreto hay q poner null
    const filter = counterReadContract.filters.Decrement(null,"0x70997970C51812dc3A010C7d01b50e0d17dc79C8")
    const logs = await counterReadContract.queryFilter(filter)
    console.log(logs)
}

getEventLogs()