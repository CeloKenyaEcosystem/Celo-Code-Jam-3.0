import { iCelodevsDetails } from '@/typings';
import { ethers } from 'ethers';
import {
  createContext,
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { celodevsContract, celodevsDetailsAbi } from '@/constants/constants';

declare global {
  interface Window {
    ethereum?: any; // Change the type to 'any'
  }
}

type AppDataProviderProps = {
  children: React.ReactNode;
};

type AppDataContextType = {
  getCelodevs: () => Promise<iCelodevsDetails[]>;
  celodevsDetails: iCelodevsDetails[];
};

export const AppDataContext = createContext({} as AppDataContextType);

export function useAppData() {
  return useContext(AppDataContext);
}

export default function AppDataProvider({ children }: AppDataProviderProps) {
  const [celodevsDetails, setCelodevsDetails] = useState<iCelodevsDetails[]>(
    []
  );

  const getCelodevs = useCallback(async function (): Promise<
    iCelodevsDetails[]
  > {
    if (!window.ethereum) {
      // Handle the case where window.ethereum is not available
      console.error('Ethereum wallet extension not detected.');
      return [];
    }
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum
      );
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        celodevsContract,
        celodevsDetailsAbi,
        signer
      );
      const getNumberOfCelodevs = await contract.getNumberOfCelodevs();
      const celodevsLength =
        ethers.BigNumber.from(getNumberOfCelodevs).toNumber();
      console.log(celodevsLength);
      const _celodevsData = [];

      for (let i = 0; i < celodevsLength; i++) {
        let _celodevData = new Promise<iCelodevsDetails>(
          async (resolve, reject) => {
            let p = await contract.getCelodevDetails(i);
            resolve({
              index: i,
              owner: p[0],
              name: p[1],
              walletAddress: p[2],
              paymentCurrency: p[3],
			  taskDescription: p[4],
              rewardAmount: p[5],
              dateCaptured: p[6],
            });
          }
        );
        _celodevsData.push(_celodevData);
      }
      const celodevData = await Promise.all(_celodevsData);
      return celodevData;
    } catch (error) {
      // Handle errors if any
      console.error('Error fetching celodev details:', error);
      return [];
    }
  },
  []);

  useEffect(() => {
    getCelodevs().then((data) => {
      setCelodevsDetails(data);
      console.log(data);
    });
  }, [getCelodevs]);

  return (
    <AppDataContext.Provider
      value={{
        getCelodevs,
        celodevsDetails,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}
