import {StakingContractABI,TokenContractABI } from "./contractABI.js"

const walletBtn = document.getElementById("wallet-btn")
const walletAddress = document.getElementById("wallet-address")

const value1 = document.getElementById("value1")
const TotalStakeValue = document.getElementById("TotalStakeValue")


const TotalCliamValue = document.getElementById("TotalClaimedValue")
const stakeBtn = document.getElementById("stakeBtn")
const claimBtn = document.getElementById("claimBtn")

const tokenAddress = "0x65c2708b0a558a2301ab7ce6e8f49548e1cfc9ac"
const stakingContractAddress ="0xe82c18f6ac918a532f3538ac9b6286fa3a520571"
// const StakingContractABI = [
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "recipient",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "amount",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "transfer",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "from",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "to",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "amount",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "transferFrom",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	}
// ]

let userAccount;
const web3 = new Web3(window.ethereum);
const stakingContract = new web3.eth.Contract(StakingContractABI, stakingContractAddress);
const tokenContract = new web3.eth.Contract(TokenContractABI ,tokenAddress)

walletBtn.addEventListener("click",connectWallet)
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

stakeBtn.addEventListener("click",stakeValue)
async function stakeValue() {
    	if(!userAccount){
		alert("Please Connect the Wallet")
	}
	const inputValue = value1.value; // read input value safely

	if (!inputValue || isNaN(inputValue) || Number(inputValue) <= 0) {
		alert("Please enter a valid amount to stake.");
		return;
	}
	try{
		console.log(inputValue)
		const stakeAmount = web3.utils.toWei(inputValue,"ether");
		
		await tokenContract.methods
		.approve(stakingContractAddress, stakeAmount)
		.send({ from: userAccount })

			console.log("Approved tokens");
	

		
		await stakingContract.methods
		.stake(stakeAmount)
		.send({ from: userAccount })
		console.log("✅ Staked tokens");


		const stakeobj = await contract.methods.stakes(userAccount).call()

		TotalStakeValue.textContent = `Total Stack Value: ${web3.utils.fromWei(stakeobj.amount)}`

	

		const balance = await tokenContract.balanceOf(userAccount)
		console.log("Token balance:", web3.utils.fromWei(balance));
		TotalCliamValue.textContent = `Total Stack Value: ${web3.utils.fromWei(balance)}`


		alert("Staking done")
	}catch(err){
		alert("Error occured :"+err)
		console.log(err)
	}
} 


claimBtn.addEventListener("click",async ()=>{
	const claimedReward = await stakingContract.methods.calculateReward(userAccount).call()
	console.log(claimedReward)
})