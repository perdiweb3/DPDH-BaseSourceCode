// const CounterMetadataFile = require("../../artifacts/contracts/Counter.sol/Counter.json")

const PROVIDER_URL = "https://polygon-amoy.g.alchemy.com/v2/lgWbt-rcdgnP1a3tL7W5GCKebQoFvth0"

const counterContractAddress = "0x14292c3ca70dc6f679B79D8521FD36d722EDFcc6"

const connectMetamask = async () => {
    console.log("connectMetamask")
    try {
        // Verificar si MetaMask está instalado
        if (window.ethereum) {
            // Crear provider
            const provider = new ethers.BrowserProvider(window.ethereum);
            
            // Solicitar conexión a la wallet
            const signer = await provider.getSigner();
            console.log("Wallet conectada:", await signer.getAddress());

            return signer
        } else {
            console.log("Por favor instala MetaMask");
        }
    } catch (error) {
        console.error("Error al conectar:", error);
    }
}

const initializeContract = async () => {
    const response = await ftch('../../artifacts/contracts/Counter.sol/Counter.json')
    const data = await response.json()
    const signer = await connectMetamask()
    const counterContract = new ethers.Contract(counterContractAddress, data.abi, signer)
    return counterContract
}

const increment = async () => {
    const counterContract = await initializeContract()
    const tx = await counterContract.increment()
    console.log("Increment Succesfull!")
}

//------------------------------------------------------------------------------------------------------------

const metamaskButton = document.getElementById("metamask")
metamaskButton.addEventListener("click", async () => {
    await connectMetamask()
})

const incrementButton = document.getElementById("increment")
incrementButton.addEventListener("click", async () => {
    await increment()
})
