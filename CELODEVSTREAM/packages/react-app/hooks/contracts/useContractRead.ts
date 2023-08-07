import { celodevsContract, celodevsDetailsAbi } from '@/constants/constants';
import { useContractRead } from 'wagmi';

export const useContractCall = (
  functionName: string,
  args?: Array<any>,
  watch?: boolean,
  from?: `0x${string}` | undefined
) => {
  const resp = useContractRead({
    address: celodevsContract,
    abi: celodevsDetailsAbi,
    functionName: functionName,
    args,
    watch,
    //overrides: from ? { from } : undefined,
    onError: (err) => {
      console.log({ err });
    },
  });

  return resp;
};
