// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SavingsModule = buildModule("SavingsModule", m => {
   const savings = m.contract("Savings");

   return { savings };
});

export default SavingsModule;
