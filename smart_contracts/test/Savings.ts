import { expect } from "chai";
import { ethers } from "hardhat";
import { Savings, Savings__factory } from "../typechain-types";

describe("Savings", function () {
   let SavingsFactory: Savings__factory;
   let savings: Savings;
   let rand_acc: any, addr1: any;

   beforeEach(async function () {
      [rand_acc, addr1] = await ethers.getSigners();

      SavingsFactory = await ethers.getContractFactory("Savings");
      savings = await SavingsFactory.connect(addr1).deploy();
   });

   it("should set the right owner", async function () {
      const owner = await savings.owner();
      expect(owner).to.equal(addr1.address);
   });

   it("should allow deposits", async function () {
      const depositAmount = ethers.parseEther("1.0");
      await savings.connect(addr1).deposit({ value: depositAmount });

      expect(await savings.getBalance()).to.equal(depositAmount);
      expect(await savings.getTotalDeposited()).to.equal(depositAmount);
   });

   it("should disallow get deposit by non-owner", () => {
      expect(savings.connect(rand_acc).deposit()).to.be.revertedWith("Ownable: caller is not the owner");
   });

   it("should allow the owner to withdraw", async () => {
      const depositAmount = ethers.parseEther("1.0");
      await savings.connect(addr1).deposit({ value: depositAmount });

      // Mengambil saldo si yang deploy
      const balanceBefore = await ethers.provider.getBalance(addr1.address);

      await savings.connect(addr1).withdraw();
      expect(await savings.getBalance()).to.equal(0);

      const balanceAfter = await ethers.provider.getBalance(addr1.address);
      expect(balanceAfter).to.be.above(balanceBefore);
   });

   it("should store the depositor address correctly", async () => {
      const depositAmount = ethers.parseEther("1.0");

      await savings.connect(addr1).deposit({ value: depositAmount });
      await savings.connect(rand_acc).deposit({ value: depositAmount });

      const deposits = await savings.getDeposits();
      expect(deposits[0].depositor).to.equal(addr1.address);
      expect(deposits[1].depositor).to.equal(rand_acc.address);
   });

   it("should have the correct deployer address", async () => {
      const expectedDeployerAddress = rand_acc.address;

      const owner = await savings.owner();
      expect(owner).not.to.equal(expectedDeployerAddress);
   });
});
