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
import { useContractCall } from '@/hooks/contracts/useContractRead';
import EmployeeTable from '@/components/celodevstable/celodevs-table';
import { useAccount, useContractRead } from 'wagmi';
import Celodevs from '@/components/Celodevs';


type AppDataProviderProps = {
  children: React.ReactNode;
};

type AppDataContextType = {
  getDevs: () => React.ReactNode[];
  //   celodevsDetails: iCelodevsDetails[];
};

export const AppDataContext = createContext({} as AppDataContextType);

export function useAppData() {
  return useContext(AppDataContext);
}

export default function AppDataProvider({ children }: AppDataProviderProps) {
  const { address } = useAccount();

  // Use the useContractCall hook to read how many products are in the marketplace contract
  //const { data } = useContractCall('getNumberOfCelodevs', [], true);

  const { data, isError, isLoading } = useContractRead({
    address: celodevsContract,
    abi: celodevsDetailsAbi,
    functionName: 'getNumberOfCelodevs',
    args: [address],
  });

  // Convert the data to a number
  const celoDevsLength = data ? Number(data.toString()) : 0;
  console.log(celoDevsLength);

  // Define a function to return the products
  const getDevs = useCallback(() => {
    // If there are no products, return null
    if (!celoDevsLength) return [];
    const celoDevs = [];
    // Loop through the products, return the Product component and push it to the products array
    for (let i = 0; i < celoDevsLength; i++) {
      celoDevs.push(<EmployeeTable key={i} id={i} />);
    }
	//console.log(celoDevs.length);
    return celoDevs;
  }, [celoDevsLength]);

  useEffect(() => {
    getDevs();
  }, [getDevs]);

  return (
    <AppDataContext.Provider
      value={{
        getDevs,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}
