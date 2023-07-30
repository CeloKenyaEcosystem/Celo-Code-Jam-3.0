import { useContractCall } from '@/hooks/contracts/useContractRead'
import columns from './columns'
import { DataTable } from './data-table'
import { celodevsType } from './data/schema'
import { useAppData } from '@/providers/AppDataProvider'

const employeeData: celodevsType[] = [
//   {
//     index: 1,
//     owner: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',
//     employee_name: 'Chizaa',
//     address: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',
//     payment_method: 'cUSD',
//     employee_salary: 3,
//     date: '20 Jan 2022, 09.00 PM',
//   },
//   {
//     index: 1,
//     employee_name: 'Chizaa',
//     owner: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',
//     address: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',
//     payment_method: 'cUSD',
//     employee_salary: 3,

//     date: '20 Jan 2022, 09.00 PM',
//   },
//   {
//     index: 2,
//     owner: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',

//     employee_name: 'Chizaa',
//     address: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',
//     payment_method: 'cUSD',
//     employee_salary: 3,

//     date: '20 Jan 2022, 09.00 PM',
//   },
//   {
//     index: 3,
//     owner: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',

//     employee_name: 'Chizaa',
//     address: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',
//     payment_method: 'cUSD',
//     employee_salary: 3,

//     date: '20 Jan 2022, 09.00 PM',
//   },
//   {
//     index: 4,
//     owner: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',

//     employee_name: 'Chizaa',
//     address: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',
//     payment_method: 'cUSD',
//     employee_salary: 3,

//     date: '20 Jan 2022, 09.00 PM',
//   },
//   {
//     index: 5,
//     owner: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',

//     employee_name: 'Chizaa',
//     address: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',
//     payment_method: 'cUSD',
//     employee_salary: 3,

//     date: '20 Jan 2022, 09.00 PM',
//   },
//   {
//     index: 6,
//     owner: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',

//     employee_name: 'Chizaa',
//     address: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',
//     payment_method: 'cUSD',
//     employee_salary: 3,

//     date: '20 Jan 2022, 09.00 PM',
//   },
//   {
//     index: 7,
//     owner: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',

//     employee_name: 'Chizaa',
//     address: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',
//     payment_method: 'cUSD',
//     employee_salary: 3,

//     date: '20 Jan 2022, 09.00 PM',
//   },
//   {
//     index: 8,
//     owner: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',

//     employee_name: 'Chizaa',
//     address: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',
//     payment_method: 'cUSD',
//     employee_salary: 3,

//     date: '20 Jan 2022, 09.00 PM',
//   },
//   {
//     index: 9,
//     owner: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',

//     employee_name: 'Chizaa',
//     address: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',
//     payment_method: 'cUSD',
//     employee_salary: 3,

//     date: '20 Jan 2022, 09.00 PM',
//   },
//   {
//     index: 10,
//     owner: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',

//     employee_name: 'Chizaa',
//     address: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',
//     payment_method: 'cUSD',
//     employee_salary: 3,

//     date: '20 Jan 2022, 09.00 PM',
//   },
//   {
//     index: 11,
//     owner: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',

//     employee_name: 'Chizaa',
//     address: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',
//     payment_method: 'cUSD',

//     employee_salary: 3,

//     date: '20 Jan 2022, 09.00 PM',
//   },
//   {
//     index: 12,
//     owner: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',

//     employee_name: 'Chizaa',
//     address: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',
//     payment_method: 'cUSD',
//     employee_salary: 3,

//     date: '20 Jan 2022, 09.00 PM',
//   },
//   {
//     index: 13,
//     owner: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',

//     employee_name: 'Chizaa',
//     address: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',
//     payment_method: 'cUSD',
//     employee_salary: 3,

//     date: '20 Jan 2022, 09.00 PM',
//   },
 ];




export default function EmployeeTable() {

	//   const { data }: any = useContractCall('readProduct', [id], true)

	const { celodevsDetails } = useAppData()
	console.log(celodevsDetails)


	return (
		<div className="container mx-auto py-6">
			<DataTable columns={columns} data={celodevsDetails} />
		</div>
	)
}
