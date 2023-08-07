import { useAccount, useContractRead } from 'wagmi';
import { celodevsContract, celodevsDetailsAbi } from '@/constants/constants';
import { useEffect, useState } from 'react';
import columns from './columns';
import { DataTable } from './data-table';
import { iCelodevsDetails } from '@/typings';

interface EmployeeTableProps {
  id: number;
}

export default function EmployeeTable({ id }: EmployeeTableProps) {
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

  const [celodevsDetails, setCelodevsDetails] =
    useState<iCelodevsDetails | null>(null);

  useEffect(() => {
    const getFormatProduct = () => {
      if (!rawProduct) return;
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
    };

    getFormatProduct();
  }, [rawProduct, id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container mx-auto py-6'>
      {celodevsDetails ? (
        <DataTable columns={columns} data={[celodevsDetails]} />
      ) : (
        <div>No Celodev details available.</div>
      )}
    </div>
  );
}
