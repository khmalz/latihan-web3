import { ethers } from "ethers";
import { contractAddress } from "./contractAddress";
import { savingsAbi } from "@/abi/savingsAbi";

let signer;
let provider;
let contract: any;

export const initializeContract = async () => {
   if (typeof (window as any).ethereum !== "undefined") {
      provider = new ethers.BrowserProvider((window as any).ethereum);
      signer = await provider.getSigner();
      contract = new ethers.Contract(contractAddress, savingsAbi, signer);

      return { provider, signer, contract };
   } else {
      alert("Please install MetaMask!");
      return {};
   }
};
