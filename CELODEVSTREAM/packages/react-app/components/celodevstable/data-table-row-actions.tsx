
import { useRouter } from 'next/navigation';
import { Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';



import { celodevsSchema } from './data/schema';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface DataTableRowActionsProps<TData> {
	row: Row<TData>;
}

export function DataTableRowActions<TData>({
	row,
}: DataTableRowActionsProps<TData>) {
	const router = useRouter();
	// const employees = employeesSchema.parse(row.original);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
					asChild={false}
				>
					<MoreHorizontal className='h-4 w-4' />
					<span className='sr-only'>Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-[160px]'>
				<DropdownMenuItem
				>
					View Details
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
