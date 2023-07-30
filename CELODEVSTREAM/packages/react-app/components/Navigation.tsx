import Link from 'next/link';
import { cn } from '@/lib/utils';
import { FC, PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';

const Navigation: FC<PropsWithChildren<{ href: string }>> = ({
  href,
  children,
}) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        href == pathname
          ? 'bg-primary text-white font-semibold'
          : 'text-neutral-300 hover:bg-primary/30 hover:text-white',
        'rounded-md px-3 py-2 text-sm font-medium'
      )}
      aria-current={href == pathname ? 'page' : undefined}
    >
      {children}
    </Link>
  );
};

export default Navigation;
