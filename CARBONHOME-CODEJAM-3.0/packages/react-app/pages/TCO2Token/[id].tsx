import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ParsedUrlQuery } from 'querystring';
import ToucanClient from 'toucan-sdk';
import { BigNumber, ContractReceipt, ethers } from 'ethers';
import { PoolSymbol } from 'toucan-sdk/dist/types';
import Link from 'next/link';
import { usePublicClient, useWalletClient } from 'wagmi';
import { formattedDate } from '@/utils/util';
import { useAccount } from 'wagmi';
import { PublicClient } from 'viem';
import { useEthersProvider } from '@/utils/provider';
import { useEthersSigner } from '@/utils/signer';

interface QueryParams extends ParsedUrlQuery {
  id: string;
  name: string;
  symbol: PoolSymbol;
  image: string;
  tokenAddress: string;
  createdAt: string;
  creationTx: string;
  score: string;
  projectVintageCreatorId: string;
  startTime: string;
  endTime: string;
  projectVintageId: string;
  isCCPcompliant: string;
  isCorsiaCompliant: string;
  vintageName: string;
  totalVintageQuantity: string;
  tx: string;
  owner: string;
}

// const CarbonCreditDetail: React.FC = () => {
//   const [contractReceipt, setcontractReceipt] = useState<ContractReceipt>();
//   const [amount, setAmount] = useState<string>('');
//   const [redeemTokenAddress, setTokenAddress] = useState<string>('');
//   const { address } = useAccount();

//   const provider = useEthersProvider();
//   const signer = useEthersSigner();

//   const sdk = new ToucanClient('alfajores', provider);
//   signer && sdk.setSigner(signer);

//   const router = useRouter();
//   const query = router.query as QueryParams;
//   const {
//     name,
//     symbol,
//     image,
//     tokenAddress,
//     createdAt,
//     creationTx,
//     score,
//     projectVintageCreatorId,
//     startTime,
//     endTime,
//     projectVintageId,
//     isCCPcompliant,
//     isCorsiaCompliant,
//     vintageName,
//     totalVintageQuantity,
//     tx,
//     owner,
//   } = query;

//   const retireToken = async (amount: string) => {
//     try {
//       if (!amount) {
//         alert('Amount field required');
//       }
//       if (!address) {
//         alert('Please connect your wallet');
//       }
//       const retire = await sdk.retire(
//         ethers.utils.parseEther(amount),
//         tokenAddress
//       );
//       console.log(retire.transactionHash);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleAmount = (e: React.FormEvent<HTMLInputElement>) => {
//     setAmount(e.currentTarget.value);
//   };

//   return (
//     <div className='bg-slate-900 text-slate-400 min-h-screen'>
//       <h1 className='bg-slate-800 py-6'>
//         <div className='container mx-auto px-4'>
//           <h1 className='text-3xl font-bold text-center text-slate-400'>
//             {name}
//           </h1>
//           <p className='text-center text-slate-400 mt-2'>{symbol}</p>
//           <p className='text-center text-slate-400 mt-2'>{`Score: ${score}`}</p>
//           <p className='text-center text-slate-400 mt-2'>
//             {`Token Address: ${tokenAddress}`}
//           </p>
//           <p className='text-center text-slate-400 mt-2'>
//             <Link
//               className='text-blue-500'
//               href={`https://explorer.celo.org/alfajores/tx/${creationTx}`}
//             >
//               Creation Hash
//             </Link>
//           </p>
//           <p className='text-center text-slate-400 mt-2 '>
//             {`Created At: ${formattedDate(parseInt(createdAt))}`}
//           </p>
//         </div>
//       </h1>
//       <div className='container mx-auto px-4 py-8 '>
//         <div className=''>
//           <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-800 rounded shadow-md p-6'>
//             <Image
//               src={image}
//               alt={name}
//               width={200}
//               height={200}
//               className='w-full mb-4 rounded'
//             />
//             <div className='p-2 text-lg'>
//               <h1 className='text-2xl font-bold'>Project Vintage</h1>
//               <p className='text-slate-400 mt-2'>{vintageName}</p>
//               {/* <p className="text-slate-400 mt-2">
//                <strong>Id:</strong>  {projectVintageCreatorId}
//               </p> */}
//               <p className='mt-2'>
//                 <strong>StartTime:</strong> {formattedDate(parseInt(startTime))}
//               </p>
//               <p className='mt-2'>
//                 <strong>EndTime:</strong> {formattedDate(parseInt(endTime))}
//               </p>
//               <p className='text-slate-400 mt-2'>
//                 <strong>isCCPcompliant:</strong> {isCCPcompliant}
//               </p>
//               <p className='text-slate-400 mt-2'>
//                 <strong>isCorsiaCompliant:</strong> {isCorsiaCompliant}
//               </p>
//               <p className='text-slate-400 mt-2'>
//                 <strong>totalVintageQuantity:</strong> {totalVintageQuantity}
//               </p>
//               <span className='text-slate-400 mr-2 mt-2'>
//                 <Link
//                   className='text-blue-400'
//                   href={`https://explorer.celo.org/alfajores/address/${projectVintageCreatorId}`}
//                 >
//                   Vintage Creator Id
//                 </Link>
//               </span>

//               <span className='text-slate-400 m-2'>
//                 <Link
//                   className='text-blue-400'
//                   href={`https://explorer.celo.org/alfajores/address/${owner}`}
//                 >
//                   owner
//                 </Link>
//               </span>
//               <span className='text-slate-400 mt-2'>
//                 <Link
//                   className='text-blue-400'
//                   href={`https://explorer.celo.org/alfajores/tx/${tx}`}
//                 >
//                   Transaction Hash
//                 </Link>
//               </span>
//               <input
//                 className='block border p-2 mt-2'
//                 type='text'
//                 placeholder='Enter amount'
//                 value={amount}
//                 onChange={handleAmount}
//               />
//               <button
//                 className=' block bg-accent hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded'
//                 onClick={() => retireToken(amount)}
//               >
//                 Retire
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CarbonCreditDetail;
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { Disclosure, RadioGroup, Tab } from '@headlessui/react';
import { StarIcon } from '@heroicons/react/20/solid';
import { HeartIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const [contractReceipt, setcontractReceipt] = useState<ContractReceipt>();
  const [amount, setAmount] = useState<string>('');
  const [redeemTokenAddress, setTokenAddress] = useState<string>('');
  const { address } = useAccount();

  const provider = useEthersProvider();
  const signer = useEthersSigner();

  const sdk = new ToucanClient('alfajores', provider);
  signer && sdk.setSigner(signer);

  const router = useRouter();
  const query = router.query as QueryParams;
  const {
    name,
    symbol,
    image,
    tokenAddress,
    createdAt,
    creationTx,
    score,
    projectVintageCreatorId,
    startTime,
    endTime,
    projectVintageId,
    isCCPcompliant,
    isCorsiaCompliant,
    vintageName,
    totalVintageQuantity,
    tx,
    owner,
  } = query;

 

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
          {/* Image gallery */}
          <Tab.Group as='div' className='flex flex-col-reverse'>
            <Tab.Panels className='aspect-w-1 aspect-h-1 w-full'>
              <Image
                src={image}
                alt={name}
                width={200}
                height={200}
                className='w-full mb-4 rounded'
              />
            </Tab.Panels>
          </Tab.Group>

          {/* Product info */}
          <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
            <h1 className='text-3xl font-bold font-display tracking-tight text-gray-900'>
              {name}
            </h1>

            <div className='mt-3'>
              <h2 className='font-bold'>Symbol</h2>
              <p className='text-3xl tracking-tight text-gray-900'>{symbol}</p>
            </div>

            {/* Reviews */}
            <div className='mt-3'>
              <h3 className='font-bold'>Score</h3>
              <div className='flex items-center'>
                <p className=''>{score}</p>
              </div>
            </div>

            <div className='mt-6'>
              <p className='text-slate-400 mt-2'>
                <Link
                  className='underline text-blue-500'
                  href={`https://explorer.celo.org/alfajores/tx/${creationTx}`}
                >
                  Creation Hash
                </Link>
              </p>
            </div>

            <section aria-labelledby='details-heading' className='mt-12'>
              <h2 id='details-heading' className=''>
                Additional details
              </h2>

              <div className='p-2 text-lg'>
                <p className='mt-2'>
                  {' '}
                  <span className='text-sm font-bold'>Project VIntage</span>{' '}
                  {vintageName}
                </p>
                <p className='mt-2'>
                  <span className='text-sm font-bold'>Id:</span>{' '}
                  {projectVintageCreatorId}
                </p>
                <p className='mt-2'>
                  <span className='text-sm font-bold'>StartTime:</span>{' '}
                  {formattedDate(parseInt(startTime))}
                </p>
                <p className='mt-2'>
                  <span className='text-sm font-bold'>EndTime:</span>{' '}
                  {formattedDate(parseInt(endTime))}
                </p>
                <p className='mt-2'>
                  <span className='text-sm font-bold'>isCCPcompliant:</span>{' '}
                  {isCCPcompliant}
                </p>
                <p className='mt-2'>
                  <span className='text-sm font-bold'>isCorsiaCompliant:</span>{' '}
                  {isCorsiaCompliant}
                </p>
                <p className='mt-2'>
                  <span className='text-sm font-bold'>
                    totalVintageQuantity:
                  </span>{' '}
                  {totalVintageQuantity}
                </p>
                <span className='mr-2 mt-2'>
                  <Link
                    className='text-blue-400 text-sm'
                    href={`https://explorer.celo.org/alfajores/address/${projectVintageCreatorId}`}
                  >
                    Vintage Creator Id
                  </Link>
                </span>

                <span className='text-slate-400 m-2'>
                  <Link
                    className='text-blue-400 text-sm'
                    href={`https://explorer.celo.org/alfajores/address/${owner}`}
                  >
                    owner
                  </Link>
                </span>
                <span className='text-slate-400 mt-2'>
                  <Link
                    className='text-blue-400'
                    href={`https://explorer.celo.org/alfajores/tx/${tx}`}
                  >
                    Transaction Hash
                  </Link>
                </span>
              </div>

              <div className='divide-y divide-gray-200 border-t'></div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
