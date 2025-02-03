import { ethers } from "hardhat";
import { contractAddress } from "../constant/address";
import { Savings } from "../typechain-types";

async function getOwner(savings: Savings) {
   const owner = await savings.owner();
   console.log(`Owner: ${owner}`);
}

async function donate(savings: Savings, amount: string) {
   const donationAmount = ethers.parseEther(amount);
   const tx = await savings.deposit({ value: donationAmount });
   await tx.wait();
   console.log(`Donated: ${ethers.formatEther(donationAmount)} ETH`);
}

async function getTotalDeposited(savings: Savings) {
   const totalDeposited = await savings.getTotalDeposited();
   console.log(`Total Deposited: ${ethers.formatEther(totalDeposited)} ETH`);
   return totalDeposited;
}

async function withdraw(savings: Savings, amount: string) {
   try {
      const tx = await savings.withdraw();
      await tx.wait();
      console.log(`Withdrawn: ${amount} ETH`);
   } catch (error: any) {
      if (error instanceof Error) {
         console.error("Error during withdrawal:", error.message);
      } else {
         console.error("An unknown error occurred during withdrawal:", error);
      }
   }
}

async function main() {
   const [deployer, acc1] = await ethers.getSigners();
   const savings: Savings = await ethers.getContractAt("Savings", contractAddress, deployer);

   await getOwner(savings);

   await donate(savings, "0.005");

   const totalDeposited = await getTotalDeposited(savings);

   await withdraw(savings, ethers.formatEther(totalDeposited));

   const totalDepositedAfter = await getTotalDeposited(savings);
}

// Menjalankan fungsi main dan menangani error
main()
   .then(() => process.exit(0))
   .catch(error => {
      console.error(error);
      process.exit(1);
   });
