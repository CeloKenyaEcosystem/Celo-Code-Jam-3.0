import React, { useState, useEffect, useCallback } from 'react';
import ToucanClient from 'toucan-sdk';
import { BigNumber, ContractReceipt, ethers } from 'ethers';
import { PoolSymbol } from 'toucan-sdk/dist/types';
import { useAccount } from 'wagmi';
import { RedeemsResponse } from 'toucan-sdk';
import { useEthersProvider } from '@/utils/provider';
import { useEthersSigner } from '@/utils/signer';

export default function Redeems() {
  const { address } = useAccount();
  const [redeems, setRedeems] = useState<RedeemsResponse[] | undefined>([]);

 const provider = useEthersProvider();
 const signer = useEthersSigner();

 const toucan = new ToucanClient('alfajores', provider);
 signer && toucan.setSigner(signer);

 


  useEffect(() => {

    const getUserRedeems = async () => {
      const result = address && (await toucan.fetchUserRedeems(address?.toLowerCase(), 'NCT'));
      result && setRedeems(result);
	  console.log(result);
    };

    // Call the getUserRetirements function
    getUserRedeems();
  }, [address]);

  console.log(redeems?.length);

  return <div>Redeems</div>;
}
