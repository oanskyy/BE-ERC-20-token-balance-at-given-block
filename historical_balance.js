const { Alchemy, Network, Utils } = require("alchemy-sdk")
// const ethers = require("ethers")
const { ethers } = require("ethers")

const config = {
	apiKey: "q7CXFQYrXDMeZG7NXyKKybu2J6E5Ng_9",
	network: Network.ETH_MAINNET
}
const alchemy = new Alchemy(config)

const main = async () => {
	// Wallet address
	const walletAddress = "0xef0dcc839c1490cebc7209baa11f46cfe83805ab"

	// USDT contract address
	const contractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
	const numDecimals = 6

	// Block number
	const blockNum = 12026456

	// ABI
	let abi = ["function balanceOf(address account)"]

	// Create function call data -- eth_call
	// let iface = new ethers.utils.Interface(abi)
	let iface = new ethers.Interface(abi)

	let data = iface.encodeFunctionData("balanceOf", [walletAddress])

	// Get balance at a particular block -- usage of eth_call
	let balance = await alchemy.core.call(
		{
			to: contractAddress,
			data: data
		},
		blockNum
	)

	balance = (parseInt(balance) / 10 ** numDecimals).toFixed(2)
	console.log("Balance:", balance, "USDT")
}

const runMain = async () => {
	try {
		await main()
		process.exit(0)
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

runMain()
