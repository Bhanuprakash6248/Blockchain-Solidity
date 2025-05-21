const walletBtn = document.getElementById("wallet-btn")
const walletAddress = document.getElementById("wallet-address")

const value1 = document.getElementById("value1")
const value2 = document.getElementById("value2")

const resultValue = document.getElementById("result")


const contractAddress = "0x40549afa3ee991b93970ecbb4d92ef120ddfd471"
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_value1",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_value2",
				"type": "uint256"
			}
		],
		"name": "sumNumber",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNumber",
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
	
        }catch(err){
            console.log(err)
        }
    }else{
		alert("Check meta mask installation")
	}
}

async function simpleSum() {
	if(!userAccount){
		alert("Please Connect the Wallet")
	}
	try{
		await contract.methods.sumNumber(value1.value,value2.value).send({from:userAccount})
		console.log(contract)
		alert("Numbers stored successfully")
	}catch(err){
		alert("Error occured",err)
	}
}

async function getValue() {

	if(value1.value === "" || value2.value === ""){
		alert("enter the values")
	}
	try{
		const result = await contract.methods.getNumber().call();
		console.log(result)
		resultValue.textContent = `sum : ${result}`

	}catch(err){
		console.log("ERROR")
	}
}