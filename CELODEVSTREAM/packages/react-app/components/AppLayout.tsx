import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { Cube, List, X } from '@phosphor-icons/react';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import MobileProfileNav from './MobileProfileNav';
import Navigation from './Navigation';

const navigation = [
  { name: 'Overview', href: '/overview' },
  { name: 'Celo Devs', href: '/celodevs' },
];

const AppLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className='min-h-screen bg-neutral-100'>
      <div className='bg-secondary pb-32 dark'>
        <Collapsible asChild>
          <nav className='bg-secondary group'>
            <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
              <div className='border-b border-neutral-700'>
                <div className='flex h-16 items-center justify-between px-4 sm:px-0'>
                  <div className='flex items-center space-x-2 text-white'>
                    <Link href='/' className='flex-shrink-0'>
                      <Cube
                        className='h-8 w-8'
                        color='#13AAA1'
                        weight='duotone'
                      />
                    </Link>
                    <Link href="/" className='text-[14px]'> CeloDev Stream</Link>
                  </div>
                  <div className=''>
                    <div className='ml-4 flex items-center md:ml-6'>
                      <div className='relative ml-3'>
                        <ConnectButton />
                      </div>
                    </div>
                  </div>
                  <div className='-mr-2 flex md:hidden'>
                    {/* Mobile menu button */}
                    <CollapsibleTrigger asChild>
                      <button className='inline-flex items-center justify-center rounded-md bg-neutral-800 p-2 text-neutral-400 hover:bg-neutral-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-800'>
                        <span className='sr-only'>Open main menu</span>
                        <X
                          className='hidden h-6 w-6 radix-state-open:block group-radix-state-open:block'
                          aria-hidden='true'
                        />
                        <List
                          className='hidden h-6 w-6 group-radix-state-closed:block'
                          aria-hidden='true'
                        />
                      </button>
                    </CollapsibleTrigger>
                  </div>
                </div>
              </div>
              <div className='mt-2 items-baseline space-x-4'>
                {navigation.map((item) => (
                  <Navigation key={item.name} href={item.href}>
                    {item.name}
                  </Navigation>
                ))}
              </div>
            </div>
            <CollapsibleContent className='border-b border-neutral-700'>
              <MobileProfileNav navigation={navigation} />
            </CollapsibleContent>
          </nav>
        </Collapsible>
      </div>

      <main className='-mt-24'>
        <div className='mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8'>
          <div className='rounded-lg bg-white px-5 py-6 shadow sm:px-6'>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
