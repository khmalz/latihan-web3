"use client";

import { ethers } from "ethers";
import { Button, List, TextInput } from "flowbite-react";
import { useState } from "react";
import { initializeContract } from "@/utils/contractUtils";
import { FaEthereum } from "react-icons/fa";

export default function ContractBalance() {
   const [contractBalance, setContractBalance] = useState<string | null>("");
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [amountValue, setAmountValue] = useState();
   const [deposits, setDeposits] = useState<any[]>([]);

   const getContractBalance = async () => {
      if (!(window as any).ethereum) {
         alert("MetaMask is not installed. Please install it to use this feature.");
         return;
      }

      try {
         const { contract } = await initializeContract();

         if (contract) {
            const balance = await contract.getTotalDeposited();
            console.log(`Contract balance: ${ethers.formatEther(balance)}`);
            setContractBalance(ethers.formatEther(balance));

            const owner = await contract.owner();
            console.log(`Contract owner: ${owner}`);
         }
      } catch (error) {
         console.error("Error getting contract balance:", error);
      }
   };

   const withdraw = async () => {
      if (!(window as any).ethereum) {
         alert("MetaMask is not installed. Please install it to use this feature.");
         return;
      }

      try {
         const { contract } = await initializeContract();

         if (contract) {
            setIsLoading(true);

            const withdrawEth = await contract.withdraw();
            await withdrawEth.wait();

            const balance = await contract.getTotalDeposited();
            console.log(`Contract balance: ${ethers.formatEther(balance)}`);
            setContractBalance(ethers.formatEther(balance));

            console.log("Contract balance withdrawn: ", contractBalance);
         }
      } catch (error) {
         console.error("Error to withdraw the contract balance:", error);
      } finally {
         setIsLoading(false);
      }
   };

   const deposit = async (e: any) => {
      e.preventDefault();

      if (!(window as any).ethereum) {
         alert("MetaMask is not installed. Please install it to use this feature.");
         return;
      }

      try {
         const { contract } = await initializeContract();

         if (contract) {
            setIsLoading(true);

            console.log("Start");

            const ethValue = ethers.parseEther(amountValue!);
            const depositEth = await contract.deposit({ value: ethValue });
            await depositEth.wait();

            const balance = await contract.getTotalDeposited();
            console.log(`Contract balance: ${ethers.formatEther(balance)}`);
            setContractBalance(ethers.formatEther(balance));
            if (deposits.length > 0) getDeposits();

            console.log("Contract balance donated: ", ethValue);
         }
      } catch (error) {
         console.error("Error to deposit:", error);
      } finally {
         setIsLoading(false);
         setAmountValue(undefined);
      }
   };

   const getDeposits = async () => {
      if (!(window as any).ethereum) {
         alert("MetaMask is not installed. Please install it to use this feature.");
         return;
      }

      try {
         const { contract } = await initializeContract();

         if (contract) {
            const depositsdata = await contract.getDeposits();

            const formattedDonations = depositsdata.map((deposit: any) => {
               return {
                  donor: deposit[0],
                  amount: ethers.formatEther(deposit[1]),
                  timestamp: new Date(Number(deposit[2].toString()) * 1000).toLocaleString(),
               };
            });

            setDeposits(formattedDonations);
         }
      } catch (error) {
         console.error("Error getting contract balance:", error);
      }
   };

   return (
      <div>
         {!contractBalance ? (
            <Button key="get-contract-balance" onClick={getContractBalance}>
               Get contract balance
            </Button>
         ) : (
            <div className="flex flex-col gap-y-3 items-center">
               <p>Contract Balance: {contractBalance}</p>
               <div className="flex flex-col gap-y-2">
                  <form onSubmit={deposit} className="my-2">
                     <div className="my-5">
                        <legend className="md:text-sm text-xs dark:text-slate-200 text-slate-900">Pick your own amount</legend>
                        <div className="max-w-xs mt-2">
                           <TextInput id="amount" type="number" icon={FaEthereum} rightIcon={FaEthereum} onInput={(e: any) => setAmountValue(e.target.value)} placeholder="amount" required />
                        </div>
                     </div>

                     <Button isProcessing={isLoading} type="submit" key="deposit" color="indigo" className="w-full">
                        Submit
                     </Button>
                  </form>

                  <Button isProcessing={isLoading} onClick={withdraw} key="withdraw" color="lime">
                     Withdraw
                  </Button>

                  <Button isProcessing={isLoading} onClick={getDeposits} key="get-list" color="info">
                     Get List Deposit
                  </Button>
               </div>

               <div className="mt-5" hidden={deposits.length === 0}>
                  <h6>List Deposit</h6>

                  <div>
                     <List>
                        {deposits.map((deposit, index) => (
                           <List.Item key={index}>
                              Address donate: ${deposit.donor}, Amount: ${deposit.amount} ETH, Timestamp: ${deposit.timestamp}
                           </List.Item>
                        ))}
                     </List>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
