import { FC, useCallback, useEffect, useState } from 'react';
import { celodevsType } from './celodevstable/data/schema';
import { iCelodevsDetails } from '@/typings';
import { celodevsContract, celodevsDetailsAbi } from '@/constants/constants';
import { useAccount, useContractRead } from 'wagmi';
import { useContractCall } from '@/hooks/contracts/useContractRead';
import { add } from 'date-fns';

interface CelodevsProps {
  id: number;
}

const Celodevs: FC<CelodevsProps> = ({ id }: CelodevsProps) => {
  // Use the useContractCall hook to read the data of the product with the id passed in, from the marketplace contract
  //   const { data: rawProduct }: any = useContractCall(
  //     'getCelodevDetails',
  //     [id],
  //     true
  //   );
  //   console.log(id);

  const { address } = useAccount();
  const {
    data: rawProduct,
    isError,
    isLoading,
  }: any = useContractRead({
    address: celodevsContract,
    abi: celodevsDetailsAbi,
    functionName: 'getCelodevDetails',
    args: [id, address],
    onError(error) {
      console.log('Error', error);
    },
  });

  console.log(rawProduct);

  const [celodevsDetails, setCelodevsDetails] =
    useState<iCelodevsDetails | null>();

  // Format the product data that we read from the smart contract
  const getFormatProduct = useCallback(() => {
    if (!rawProduct) return null;
    setCelodevsDetails({
      index: id,
      owner: rawProduct[0],
      name: rawProduct[1],
      walletAddress: rawProduct[2],
      paymentCurrency: rawProduct[3],
      taskDescription: rawProduct[4],
      rewardAmount: rawProduct[5],
      dateCaptured: rawProduct[6],
    });
  }, [rawProduct, id]);

  console.log(celodevsDetails);

  // Call the getFormatProduct function when the rawProduct state changes
  useEffect(() => {
    getFormatProduct();
  }, [getFormatProduct]);

  // If the devs cannot be loaded, return null
  if (!celodevsDetails) return null;
  return <div>{celodevsDetails.name}</div>;
};

export default Celodevs;
