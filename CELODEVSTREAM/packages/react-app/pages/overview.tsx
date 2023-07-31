import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useContractCall } from '@/hooks/contracts/useContractRead';
import { useAccount, useContractRead } from 'wagmi';
import employeeAbi from '@/abi/EmployeeDetails.json';
import { useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers';
import { celodevsContract, celodevsDetailsAbi } from '@/constants/constants';
import Layout from '@/components/Layout';

const Overview = () => {
  //const { data } = useContractCall('getNumberOfEmployees', [], true);

  //   const {address}= useAccount();
  //      const { data, isError, isLoading } = useContractRead({
  //        address: celodevsContract,
  //        abi: celodevsDetailsAbi,
  //        functionName: 'getNumberOfCelodevs',
  //        args: [address],
  //      });

  //     // // Convert the data to a number
  //     const celodevsLength = data ? Number(data.toString()) : 0;

  // 	console.log(celodevsLength)

  const [numberOfCelodevs, setNumberOfCelodevs] = useState(0);
  async function getItemLength() {
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        celodevsContract,
        celodevsDetailsAbi,
        signer
      );

      const getNumberOfCelodevs = await contract.getNumberOfCelodevs();
      return getNumberOfCelodevs;
    } catch (err) {
      console.error(err);
    }
  }

  //get my products
  useEffect(() => {
    getItemLength().then((data) => {
      setNumberOfCelodevs(data);
      console.log(data);
    });
  }, []);

  const celodevsLength = numberOfCelodevs
    ? ethers.BigNumber.from(numberOfCelodevs).toString()
    : 0;
  console.log(celodevsLength);

  return (
    <Layout>
      <div className='p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Celo devs
            </CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'
            >
              <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
              <circle cx='9' cy='7' r='4' />
              <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
            </svg>
          </CardHeader>
          <CardContent>
            {/* {isLoading ? (
              <p className='text-2xl font-bold'>Loading...</p>
            ) : (
              <div className='text-2xl font-bold'>{employeeLength}</div>
            )} */}
            <p>{celodevsLength}</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Overview;
