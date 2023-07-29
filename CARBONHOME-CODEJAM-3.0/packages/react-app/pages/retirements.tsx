import columns from '@/components/retirementtable/columns';
import { DataTable } from '@/components/retirementtable/data-table';
import { useEffect, useState } from 'react';
import ToucanClient, { UserRetirementsResponse } from 'toucan-sdk';
import { useAccount } from 'wagmi';

export default function Retirements() {
  const toucan = new ToucanClient('alfajores');
  const { address } = useAccount();

  const [retirements, setRetirements] = useState<UserRetirementsResponse[]>([]);

 useEffect(() => {
   // Define the getUserRetirements function inside the useEffect callback
   const getUserRetirements = async () => {
     const result =
       address && (await toucan.fetchUserRetirements(address?.toLowerCase()));
     result && setRetirements(result);
   };

   // Call the getUserRetirements function
   getUserRetirements();
 }, [address]);

  return (
    <div>
      <div className='container mx-auto py-6'>
        <DataTable columns={columns} data={retirements} />
      </div>
    </div>
  );
}
