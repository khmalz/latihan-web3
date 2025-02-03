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

async function getDonations(savings: Savings) {
   const donations = await savings.getDeposits(); // Misalnya, ini mengembalikan array dari DepositInfoStructOutput

   // Memformat data donasi
   const formattedDonations = donations.map(donation => {
      return {
         donor: donation[0],
         amount: ethers.formatEther(donation[1]),
         timestamp: new Date(Number(donation[2].toString()) * 1000).toLocaleString(),
      };
   });

   console.log("Donations:");
   formattedDonations.forEach(donation => {
      console.log(`Donor: ${donation.donor}, Amount: ${donation.amount} ETH, Timestamp: ${donation.timestamp}`);
   });
}

async function main() {
   const [deployer, acc1] = await ethers.getSigners();
   const savings: Savings = await ethers.getContractAt("Savings", contractAddress, acc1);

   await getOwner(savings);

   // await donate(savings, "1");

   const totalDeposited = await getTotalDeposited(savings);

   // await withdraw(savings, ethers.formatEther(totalDeposited));

   const totalDepositedAfter = await getTotalDeposited(savings);

   await getDonations(savings);
}

// Menjalankan fungsi main dan menangani error
main()
   .then(() => process.exit(0))
   .catch(error => {
      console.error(error);
      process.exit(1);
   });
