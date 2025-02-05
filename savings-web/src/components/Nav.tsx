"use client";

import { Avatar, Button, DarkThemeToggle, Dropdown, Navbar, Popover } from "flowbite-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSDK } from "@metamask/sdk-react";
import { FaUserCircle } from "react-icons/fa";

export default function Nav() {
   const { sdk, connected, connecting } = useSDK();
   const [walletAddress, setWalletAddress] = useState("");
   const [error, setError] = useState("");

   useEffect(() => {
      const savedWalletAddress = localStorage.getItem("walletAddress");

      if (savedWalletAddress) {
         setWalletAddress(savedWalletAddress);
      }
   }, []);

   const connect = async () => {
      if (!(window as any).ethereum) {
         alert("MetaMask is not installed. Please install it to use this feature.");
         return;
      }

      try {
         const accounts = await sdk?.connect();
         const address = accounts?.[0];

         if (address) {
            setWalletAddress(address);
            localStorage.setItem("walletAddress", address);
         }
      } catch (err) {
         setError("Failed to connect wallet");
         console.error("Failed to connect wallet:", error);
      }
   };

   const disconnect = () => {
      if (sdk) {
         sdk.terminate();
         localStorage.removeItem("walletAddress");
         setWalletAddress("");
         setError("");
      }
   };

   const contentPopover = (
      <div className="w-full text-sm text-gray-500 dark:text-gray-400">
         <div className="px-3 py-2">
            <p>Switch Mode</p>
         </div>
      </div>
   );

   const pathname = usePathname();

   return (
      <Navbar fluid rounded>
         <Navbar.Brand href="/">
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Latihan Web3</span>
         </Navbar.Brand>
         <div className="flex md:order-2 space-x-4">
            <Popover content={contentPopover} trigger="hover">
               <DarkThemeToggle className="focus:ring-1" />
            </Popover>

            {connected && walletAddress ? (
               <Dropdown arrowIcon={false} inline label={<FaUserCircle className="text-gray-500 dark:text-gray-400" />}>
                  <Dropdown.Header>
                     <span className="block text-sm">{connecting ? "Connecting..." : walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4)}</span>
                  </Dropdown.Header>
                  <Dropdown.Item onClick={disconnect}>Sign out</Dropdown.Item>
               </Dropdown>
            ) : (
               <Button size="xs" isProcessing={connecting} onClick={connect} disabled={connecting} className="!text-white dark:bg-amber-700 hidden md:block dark:hover:!bg-amber-800 focus:ring-1 dark:focus:bg-amber-700">
                  <span className="lg:text-sm">Connect with E-wallet</span>
               </Button>
            )}
            <Navbar.Toggle />
         </div>
         <Navbar.Collapse>
            <Navbar.Link href="#" active>
               Home
            </Navbar.Link>
         </Navbar.Collapse>
      </Navbar>
   );
}
