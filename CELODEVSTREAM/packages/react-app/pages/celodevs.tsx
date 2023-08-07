import AddEmployeeModal from '@/components/modals/AddCelodevModal';
import EmployeeTable from '@/components/celodevstable/celodevs-table';

// Importing the dependencies
import { useState } from 'react';
// Import the Product and Alert components
import ErrorAlert from '@/components/alerts/ErrorAlert';
import LoadingAlert from '@/components/alerts/LoadingAlert';
import SuccessAlert from '@/components/alerts/SuccessAlert';
import { NextPage } from 'next';
import Layout from '@/components/Layout';
import { useAppData } from '@/providers/AppDataProvider';

// Alerts component
const Alerts = ({ error, success, loading, clear }: any) => {
  return (
    <div>
      {error && <ErrorAlert message={error} clear={clear} />}
      {success && <SuccessAlert message={success} />}
      {loading && <LoadingAlert message={loading} />}
    </div>
  );
};
const CelodevsPage: NextPage = () => {
	const { getDevs } = useAppData()
  // Define the states to store the error, success and loading messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState('');
  // Define a function to clear the error, success and loading states
  const clear = () => {
    setError('');
    setSuccess('');
    setLoading('');
  };
  
  return (
      <Layout>
        <Alerts
          error={error}
          success={success}
          loading={loading}
          clear={clear}
        />

        <AddEmployeeModal />
		{getDevs()}
      </Layout>
  );
};

export default CelodevsPage;
