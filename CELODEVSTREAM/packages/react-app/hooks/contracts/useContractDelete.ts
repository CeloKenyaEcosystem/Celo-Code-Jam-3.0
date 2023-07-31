import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { BigNumber } from 'ethers';
import { celodevsContract, celodevsDetailsAbi } from '@/constants/constants';

// write to a smart contract
export const useContractDelete = (id: number) => {
  const gasLimit = BigNumber.from(1000000);

  const { config } = usePrepareContractWrite({
    address: celodevsContract,
    abi: celodevsDetailsAbi,
    functionName: 'deletecelodevsDetails',
    args: [id],
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
