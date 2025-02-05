export const savingsAbi = [
   {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
   },
   {
      anonymous: false,
      inputs: [
         {
            indexed: true,
            internalType: "address",
            name: "depositor",
            type: "address",
         },
         {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
         },
         {
            indexed: false,
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
         },
      ],
      name: "Deposit",
      type: "event",
   },
   {
      anonymous: false,
      inputs: [
         {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
         },
         {
            indexed: false,
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
         },
      ],
      name: "Withdrawal",
      type: "event",
   },
   {
      inputs: [],
      name: "deposit",
      outputs: [],
      stateMutability: "payable",
      type: "function",
   },
   {
      inputs: [
         {
            internalType: "uint256",
            name: "",
            type: "uint256",
         },
      ],
      name: "deposits",
      outputs: [
         {
            internalType: "address",
            name: "depositor",
            type: "address",
         },
         {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
         },
         {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
         },
      ],
      stateMutability: "view",
      type: "function",
   },
   {
      inputs: [],
      name: "getBalance",
      outputs: [
         {
            internalType: "uint256",
            name: "",
            type: "uint256",
         },
      ],
      stateMutability: "view",
      type: "function",
   },
   {
      inputs: [
         {
            internalType: "uint256",
            name: "index",
            type: "uint256",
         },
      ],
      name: "getDeposit",
      outputs: [
         {
            components: [
               {
                  internalType: "address",
                  name: "depositor",
                  type: "address",
               },
               {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
               },
               {
                  internalType: "uint256",
                  name: "timestamp",
                  type: "uint256",
               },
            ],
            internalType: "struct Savings.DepositInfo",
            name: "",
            type: "tuple",
         },
      ],
      stateMutability: "view",
      type: "function",
   },
   {
      inputs: [],
      name: "getDeposits",
      outputs: [
         {
            components: [
               {
                  internalType: "address",
                  name: "depositor",
                  type: "address",
               },
               {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
               },
               {
                  internalType: "uint256",
                  name: "timestamp",
                  type: "uint256",
               },
            ],
            internalType: "struct Savings.DepositInfo[]",
            name: "",
            type: "tuple[]",
         },
      ],
      stateMutability: "view",
      type: "function",
   },
   {
      inputs: [],
      name: "getTotalDeposited",
      outputs: [
         {
            internalType: "uint256",
            name: "",
            type: "uint256",
         },
      ],
      stateMutability: "view",
      type: "function",
   },
   {
      inputs: [],
      name: "owner",
      outputs: [
         {
            internalType: "address payable",
            name: "",
            type: "address",
         },
      ],
      stateMutability: "view",
      type: "function",
   },
   {
      inputs: [],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
   },
   {
      stateMutability: "payable",
      type: "receive",
   },
];
