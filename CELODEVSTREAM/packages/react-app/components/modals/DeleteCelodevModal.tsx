import { useState } from 'react';
import { toast } from 'react-toastify';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useContractDelete } from '@/hooks/contracts/useContractDelete';
import { waitForTransaction } from '@wagmi/core';
import { useRouter } from 'next/navigation';


interface Props {
  id: number;
}

const DeleteCelodevModal = ({ id }: Props) => {

	const router = useRouter();

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState('');

  const { writeAsync: deleteCelodevFunc } = useContractDelete(id);

  const handleDeleteCelodev = async () => {
    if (!deleteCelodevFunc) {
      throw 'Failed to delete Celodev';
    }
    setLoading('Deleting...');
    const { hash: deleteHash }= await deleteCelodevFunc();
    setLoading('Waiting for confirmation...');
    await waitForTransaction({ confirmations: 1, hash: deleteHash });
    setVisible(false);
  };

  const deleteCelodev = async (e: any) => {
    e.preventDefault();
    try {
      await toast.promise(handleDeleteCelodev(), {
        pending: 'Deleting Celodev...',
        success: 'Celodev deleted successfully',
        error: 'Something went wrong. Try again.',
      });
      setTimeout(() => {
        router.refresh();
      }, 7000);
    } catch (e: any) {
      console.log({ e });
      toast.error(e?.message);
    } finally {
      setLoading('');
    }
  };

  return (
    <div>
      <button
        type='button'
        onClick={() => setVisible(true)}
        className='inline-block ml-4 p-1 bg-red-500 text-white rounded-[4px] font-medium text-md leading-tight shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out'
        data-bs-toggle='modal'
        data-bs-target='#exampleModalCenter'
      >
        <TrashIcon className='block h-4 w-4' aria-hidden='true' />
      </button>

      {/* Modal */}
      {visible && (
        <div
          className='fixed z-40 overflow-y-auto top-0 w-full left-0'
          id='modal'
        >
          <form onSubmit={deleteCelodev}>
            <div className='flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
              <div className='fixed inset-0 transition-opacity'>
                <div className='absolute inset-0 bg-gray-900 opacity-75' />
              </div>
              <span className='hidden sm:inline-block sm:align-middle sm:h-screen'>
                &#8203;
              </span>
              <div
                className='inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
                role='dialog'
                aria-modal='true'
                aria-labelledby='modal-headline'
              >
                <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                  <p className='text-black'>Are you sure you want to delete this Celodev?</p>
                </div>
                <div className='bg-gray-200 px-4 py-3 text-right'>
                  <button
                    type='button'
                    className='py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2'
                    onClick={() => setVisible(false)}
                  >
                    <i className='fas fa-times'></i> Cancel
                  </button>
                  <button
                    type='submit'
                    disabled={!!loading || !deleteCelodev}
                    className='py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700 mr-2'
                  >
                    {loading ? loading : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default DeleteCelodevModal;
