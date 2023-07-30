import { FC, ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

import { Spectral, Outfit } from 'next/font/google';

const spectral = Spectral({
	variable: '--display-font',
	subsets: ['latin'],
	weight: '200'
});

const outfit = Outfit({
  variable: '--body-font',
  subsets: ['latin'],
});

interface Props {
  children: ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
  return (
    <div className={`${spectral.variable} ${outfit.variable}`}>
      <div className='bg-white'>
        <Header />
        <div className='font-body'>{children}</div>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Layout;
