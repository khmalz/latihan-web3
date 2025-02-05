"use client";

import Nav from "@/components/Nav";
import { MetaMaskProvider } from "@metamask/sdk-react";

export default function MetaProvider({ children }: { children: React.ReactNode }) {
   const host = typeof window !== "undefined" ? window.location.host : "defaultHost";
   const sdkOptions = {
      logging: { developerMode: false },
      checkInstallationImmediately: false,
      dappMetadata: {
         name: "Next-Metamask-Boilerplate",
         url: host,
      },
   };

   return (
      <MetaMaskProvider sdkOptions={sdkOptions} debug={false}>
         <div>
            <Nav />
            <div className="min-h-screen">{children}</div>
         </div>
      </MetaMaskProvider>
   );
}
