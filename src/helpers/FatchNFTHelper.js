import axios from "axios";
import Web3 from "web3";

export const NFTDetail = async (chainId , Address) => {
	chainId = Web3.utils.toHex(chainId);
	const NFT = await axios.get(`https://deep-index.moralis.io/api/v2/${Address?.toLowerCase()}/nft?chain=${chainId}&format=decimal&normalizeMetadata=false`, {
		headers: {
			'X-API-Key': 'IOetVRllSRhyXqyHKiDIzXwIIdrnI8PPyualaekDhdexpIeuNpBN8Ks0D2cN4DrY',
			'accept': 'application/json'
		},
	});
	const AllData = NFT.data.result;
	let NFTlength = NFT.data.result.length;
	console.log(NFTlength);
	let NFTContract = [];
	let CollectionObj;
	for(let i = 0; i < NFTlength ; i++){
		CollectionObj = {
			Name : NFT.data.result[i].name,
			TokenAddress : NFT.data.result[i].token_address,
			metadata: NFT.data.result[i].metadata,
			Symbol: NFT.data.result[i].symbol,
		}
		NFTContract.push(CollectionObj);
	}
	const uniqueIds = [];
	const uniqueEmployees = NFTContract.filter(element => {
	const isDuplicate = uniqueIds.includes(element.TokenAddress);
	if (!isDuplicate) {
		uniqueIds.push(element.TokenAddress);
		return true;
	}
	return false;
	});
	let obj;
	obj = {
		AllData : AllData,
		collection : uniqueEmployees
	}
	console.log("obj",obj);
	return obj; 
};


export const NFTDetailByWallet = async (chainId , Address, ContractAddress) => {
	chainId = Web3.utils.toHex(chainId);
	console.log(chainId);
	const NFT = await axios.get(`https://deep-index.moralis.io/api/v2/nft/${ContractAddress.toLowerCase()}/owners?chain=${chainId}&format=decimal&normalizeMetadata=false`, {
		headers: {
			'X-API-Key': 'IOetVRllSRhyXqyHKiDIzXwIIdrnI8PPyualaekDhdexpIeuNpBN8Ks0D2cN4DrY',
			'accept': 'application/json'
		},
	});
	const AllData = NFT.data.result;
	let NFTlength = NFT.data.result.length;
	let NFTDetail = [];
	for(let i = 0; i < NFTlength ; i++){
		if(AllData[i].owner_of.toLowerCase() === Address.toLowerCase()){
			NFTDetail.push(AllData[i]);
		}
	}

	return NFTDetail;
	
};


