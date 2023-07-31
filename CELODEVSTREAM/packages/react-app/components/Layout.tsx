import { FC, ReactNode } from 'react';
import AppLayout from './AppLayout';
import ClientOnly from './ClientOnly';

interface Props {
  children: ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
  return (
    <ClientOnly>
      <AppLayout>{children}</AppLayout>
    </ClientOnly>
  );
};

export default Layout;
