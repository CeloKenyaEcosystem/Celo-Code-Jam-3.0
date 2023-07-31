'use client';

import { FC } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { CollapsibleTrigger } from './ui/collapsible';


export const MobileProfileNav: FC<{
  navigation: Array<{ name: string; href: string }>;
}> = ({ navigation }) => {
  const pathname = usePathname();

  return (
    <>
      <div className='space-y-1 px-2 py-3 sm:px-3'>
        {navigation.map((item) => (
          <CollapsibleTrigger key={item.name} asChild>
            <Link
              href={item.href}
              aria-current={pathname == item.href ? 'page' : undefined}
              className={cn(
                pathname == item.href
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-300 hover:bg-neutral-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
            >
              {item.name}
            </Link>
          </CollapsibleTrigger>
        ))}
      </div>
    </>
  );
};

export default MobileProfileNav;
