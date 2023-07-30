import { useEthersProvider } from '@/utils/provider';
import { useEthersSigner } from '@/utils/signer';
import { parseEther } from 'ethers/lib/utils';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import ToucanClient from 'toucan-sdk';
import { Input } from './ui/input';

export default function Hero() {
  const provider = useEthersProvider();
  const signer = useEthersSigner();

  const toucan = new ToucanClient('alfajores', provider);
  signer && toucan.setSigner(signer);

  const [tco2address, setTco2address] = useState('');
  const [nctPrice, setNctPrice] = useState({});
  const [offset, setOffset] = useState<string>('');
  const [retireAmount, setRetireAmount] = useState<string>('');
  const [NCTLength, setNCTLength] = useState(0);

  //Offset carbon
  const redeemPoolToken = async (): Promise<void> => {
    try {
      const redeemedTokenAddress = await toucan.redeemAuto2(
        'NCT',
        parseEther(offset)
      );
      redeemedTokenAddress && setTco2address(redeemedTokenAddress[0].address);
      setOffset('');
      toast.success('TCO2 Redeemed', { duration: 4000 });
    } catch (error) {
      toast.error('Error Redeeming Token: Get NCT from faucet');
    }
  };

  //retire carbon and get a certificate
  const retirePoolToken = async (): Promise<void> => {
    try {
      tco2address.length &&
        (await toucan.retire(parseEther(retireAmount), tco2address));

      setRetireAmount('');

      toast.success('TCO2 Retired', { duration: 4000 });
    } catch (error) {
      toast.error('Error Retiring Token');
    }
  };

  //Fetch NCT Balance
  useEffect(() => {
    const fetchResult = async () => {
      const scoredTCO2s = await toucan.getScoredTCO2s('NCT');
      const len = scoredTCO2s.length;
      setNCTLength(len);
    };
    fetchResult();
  }, []);

  //Fetch NCT price
  useEffect(() => {
    const getNCTPrice = async (): Promise<void> => {
      const price = await toucan.fetchTokenPriceOnDex('NCT');
      setNctPrice(price);
    };
    getNCTPrice();
  }, []);

  return (
    <div className='bg-white'>
      <main>
        <div className='relative isolate'>
          <div
            className='absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48'
            aria-hidden='true'
          >
            <div
              className='aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-forest to-prosperity opacity-30'
              style={{
                clipPath:
                  'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
              }}
            />
          </div>
          <div className='overflow-hidden'>
            <div className='mx-auto max-w-7xl px-6 pb-32 pt-6 sm:pt-10 lg:px-8 lg:pt-16'>
              <div className='mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center'>
                <div className='w-full max-w-xl lg:shrink-0 xl:max-w-2xl'>
                  <h1 className='font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
                    Climate positive dApp with ToucanSDK
                  </h1>
                  <p className='relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none'>
                    Get ahead in sustainability. Easily retire carbon credits on
                    the Celo blockchain with our app&apos;s powerful ToucanSDK
                    integration.
                  </p>
                  <div className='mt-10 flex items-center gap-x-6'>
                    <div>
                      <Input
                        className=''
                        placeholder='Carbon Offset amount'
                        type='text'
                        value={offset}
                        onChange={(e: any) => setOffset(e.target.value)}
                      />
                      <button
                        className='inline-flex justify-center rounded-full border px-5 my-5 py-2 text-md font-medium border-wood bg-prosperity text-wood hover:bg-snow'
                        onClick={() => redeemPoolToken()}
                      >
                        {'Redeem Tokens'}
                      </button>
                    </div>
                    <div>
                      <Input
                        className=''
                        placeholder='Retire Carbon amount'
                        type='text'
                        value={retireAmount}
                        onChange={(e: any) => setRetireAmount(e.target.value)}
                      />

                      <button
                        className='inline-flex justify-center rounded-full border px-5 my-5 py-2 text-md font-medium border-wood bg-forest text-white hover:bg-snow'
                        onClick={() => retirePoolToken()}
                      >
                        {'Retire Tokens'}
                      </button>
                    </div>
                  </div>
                  <div className='flex space-x-3 '>
                    <p className='text-wood border-r-2 pr-4'>
                      NCT Tokens: {NCTLength > 0 ? NCTLength : '0'}
                    </p>
                    <a
                      href='https://faucet.toucan.earth/'
                      target='_blank'
                      className='underline text-forest'
                    >
                      Toucan Earth Faucet
                    </a>
                  </div>
                </div>
                <div className='mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0'>
                  <div className='ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80'>
                    <div className='relative'>
                      <img
                        src='https://images.unsplash.com/photo-1622219970016-09f07c1eed36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'
                        alt=''
                        className='aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
                      />
                      <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10' />
                    </div>
                  </div>
                  <div className='mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36'>
                    <div className='relative'>
                      <img
                        src='https://images.unsplash.com/photo-1617953141905-b27fb1f17d88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'
                        alt=''
                        className='aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
                      />
                      <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10' />
                    </div>
                    <div className='relative'>
                      <img
                        src='https://images.unsplash.com/photo-1626174630159-5331060caa95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80'
                        alt=''
                        className='aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
                      />
                      <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10' />
                    </div>
                  </div>
                  <div className='w-44 flex-none space-y-8 pt-32 sm:pt-0'>
                    <div className='relative'>
                      <img
                        src='https://images.unsplash.com/photo-1589401568809-6eb66e4985c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=431&q=80'
                        alt=''
                        className='aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
                      />
                      <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10' />
                    </div>
                    <div className='relative'>
                      <img
                        src='https://images.unsplash.com/photo-1518399681705-1c1a55e5e883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=327&q=80'
                        alt=''
                        className='aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
                      />
                      <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
