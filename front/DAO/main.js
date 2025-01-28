const HARDHAT_URL = "http://127.0.0.1:8545";

const DAOAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"
const initializeLocalhostByPK = async () =>{
    const response = await fetch('../../artifacts/contracts/DAO/DAO.sol/KeepCodignDAO.json')
    const data = await response.json()

    const provider = new ethers.JsonRpcProvider(HARDHAT_URL);
    const signer = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider)
    const readContract = new ethers.Contract(
        DAOAddress,
        data.abi,
        provider
    )
    const writeContract = readContract.connect(signer)

    console.log(await signer.getAddress())
    return {signer, provider, readContract, writeContract}
}

const initializeLocalhostByMetamask = async() => {
    const response = await fetch('../../artifacts/contracts/DAO/DAO.sol/KeepCodignDAO.json')
    const data = await response.json()
    
    console.log("connectMetamask")
    try {
        // Verificar si MetaMask está instalado
        if (window.ethereum) {
            // Crear provider
            const provider = new ethers.BrowserProvider(window.ethereum);
            
            // Solicitar conexión a la wallet
            const signer = await provider.getSigner();
            console.log("Wallet conectada:", await signer.getAddress());

            const readContract = new ethers.Contract(
                DAOAddress,
                data.abi,
                provider
            )

            const writeContract = readContract.connect(signer)

            console.log(await signer.getAddress())
            return {provider,signer, readContract, writeContract}
        } else {
            console.log("Por favor instala MetaMask");
        }
    } catch (error) {
        console.error("Error al conectar:", error);
    }
}

const createProposal = async() => {
    console.log("Creacion de propuesta inicializada...")
    try{
        const {writeContract} = await initializeLocalhostByPK()
        const tx = await writeContract.createProposal("TEST CREACION", "Test en el que probamos la creacion de una propuesta")
        console.log("Propuesta creada correctamente!")
    }catch(error){
        console.log("Error al crear la propuesta")
        console.log(error)
    }
}

const viewProposal = async() => {
    const {readContract} = await initializeLocalhostByPK()
    const proposal = await readContract.getProposal(1)
    console.log(proposal)
    console.log(proposal.title)
    console.log(proposal.proposalId)
}



const createProposalButton = document.getElementById("createProposal")
createProposalButton.addEventListener("click", async () => {
    await createProposal()
})

const getProposalButton = document.getElementById("getProposal")
getProposalButton.addEventListener("click", async () => {
    await viewProposal()
})

const connectByMetamaskButton = document.getElementById("connectByMetamask")
const connectByPKButton = document.getElementById("connectByPK")
connectByMetamaskButton.addEventListener("click", async () => {
    await initializeLocalhostByMetamask()
})
connectByPKButton.addEventListener("click", async () => {
    await initializeLocalhostByPK()
})