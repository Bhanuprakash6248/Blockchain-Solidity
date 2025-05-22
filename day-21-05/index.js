const walletBtn = document.getElementById("wallet-btn")
const walletAddress = document.getElementById("wallet-address")

const value1 = document.getElementById("value1")
const storedValue = document.getElementById("store")


const resultValue = document.getElementById("result")

const contractAddress ="0x47002e492b82d77ba2a88f358c3a8836eb71f26f"
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_number",
				"type": "uint256"
			}
		],
		"name": "setValue",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "claimValue",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "result",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "message",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getValue",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "setTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "value",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
let userAccount;
const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(contractABI, contractAddress);


async function connectWallet(){

    if(window.ethereum){
        try{
            const accounts = await window.ethereum.request({method:"eth_requestAccounts"});
            userAccount = accounts[0]
            walletAddress.textContent = userAccount
			walletBtn.textContent="Wallet Connected"
	
        }catch(err){
            console.log(err)
        }
    }else{
		alert("Check meta mask installation")
	}
}

async function stakeValue() {
    	if(!userAccount){
		alert("Please Connect the Wallet")
	}
	try{
		await contract.methods.setValue(value1.value).send({from:userAccount})
        const storednumber = await contract.methods.getValue().call()
      
        storedValue.textContent = `Stored value:${storednumber}`
		alert("Numbers stored successfully")
	}catch(err){
		alert("Error occured",err)
	}
} 


async function getValue() {
    if(!userAccount){
        alert("Please Connect the wallet!!")
    }
    try{
        const setTime = await contract.methods.setTime().call()
		console.log(setTime)
		const claimResult = await contract.methods.claimValue().call()
		result.style.color="green"
		result.textContent = `claimed Value :${claimResult}`			




    }catch(err){
        console.log(err.message)
		result.style.color="red"
        result.textContent = err.message
		
    }
}