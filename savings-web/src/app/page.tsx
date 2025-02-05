import ContractBalance from "@/components/ContractBalance";

export default function Home() {
   return (
      <div className="min-h-screen flex items-center justify-center">
         <div className="flex flex-col items-center gap-y-2">
            <h1 className="text-2xl">Flowbite React + Next.js</h1>
            <div className="mt-5">
               <ContractBalance />
            </div>
         </div>
      </div>
   );
}
