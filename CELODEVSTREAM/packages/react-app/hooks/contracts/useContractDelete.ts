import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { BigNumber } from 'ethers';
import { celodevsContract, celodevsDetailsAbi } from '@/constants/constants';
import { add } from 'date-fns';

// write to a smart contract
export const useContractDelete = (id: number, address: string) => {
  const gasLimit = BigNumber.from(1000000);

  const { config } = usePrepareContractWrite({
    address: celodevsContract,
    abi: celodevsDetailsAbi,
    functionName: 'deletecelodevsDetails',
    args: [id, address],
    // overrides: {
    //   gasLimit,
    // },
    onError: (err) => {
      console.log({ err });
    },
  });

  const { data, isSuccess, write, writeAsync, error, isLoading } =
    useContractWrite(config);
  return { data, isSuccess, write, writeAsync, isLoading };
};
