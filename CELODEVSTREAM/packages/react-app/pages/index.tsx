import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Cube } from '@phosphor-icons/react';
import Image from 'next/image';


export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className='bg-gray-900'>
      <header className='absolute inset-x-0 top-0 z-50'>
        <nav
          className='flex items-center justify-between p-6 lg:px-8'
          aria-label='Global'
        >
          <div className='flex lg:flex-1'>
            <div className='flex items-center space-x-2 text-white'>
              <Link href='/' className='flex-shrink-0'>
                <Cube className='h-8 w-8' color='#13AAA1' weight='duotone' />
              </Link>
              <p className='text-[14px]'> CeloDev Stream</p>
            </div>
          </div>
          <div className='flex lg:hidden'>
            <button
              type='button'
              className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400'
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className='sr-only'>Open main menu</span>
              <Bars3Icon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
            <Link
              href='/overview'
              className='text-sm font-semibold leading-6 text-white hover:text-primary'
            >
              Launch App <span aria-hidden='true'>&rarr;</span>
            </Link>
          </div>
        </nav>
        <Dialog
          as='div'
          className='lg:hidden'
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className='fixed inset-0 z-50' />
          <Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2 text-white'>
                <Link href='/' className='flex-shrink-0'>
                  <Cube className='h-8 w-8' color='#13AAA1' weight='duotone' />
                </Link>
                <p className='text-[14px]'> CeloDev Stream</p>
              </div>
              <button
                type='button'
                className='-m-2.5 rounded-md p-2.5 text-gray-400'
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className='sr-only'>Close menu</span>
                <XMarkIcon className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>
            <div className='mt-6 flow-root'>
              <div className='-my-6 divide-y divide-gray-500/25'>
                <div className='py-6'>
                  <Link
                    href='/overview'
                    className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:text-primary hover:text-underline'
                  >
                    Launch App
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div className='relative isolate overflow-hidden pt-14'>
        <Image
          src='https://res.cloudinary.com/dqab6gg7d/image/upload/v1690474779/Fz8e2o6X0AAHWhB_oqwnoi_copy-2_ljbvf5.jpg'
          alt=''
		  height={678}
		  width={1155}
          className='absolute inset-0 -z-10 h-full w-full object-cover'
        />
        <div className='absolute inset-0 bg-secondary opacity-90'></div>

        <div
          className='absolute inset-x-0 -top-40 z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
          aria-hidden='true'
        >
          <div
            className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className='relative inset-0 z-20 mx-auto max-w-2xl py-20 sm:py-36 lg:py-40 min-h-screen'>
          <div className='text-center'>
            <h1 className='text-4xl font-bold tracking-tight text-white sm:text-6xl'>
              CeloDev Stream: Where CodeJam Skills Get Rewarded!
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-300'>
              Earn rewards in cUSD as you showcase your skills and
              contribute to the Celo community. Get instant
              payouts through our Superfluid-powered streaming app,
              ensuring you receive what you deserve in real-time!
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <Link
                href='/overview'
                className='rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#107f85] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400'
              >
                Launch App
              </Link>
            </div>
          </div>
        </div>
        <div
          className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
          aria-hidden='true'
        >
          <div
            className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
