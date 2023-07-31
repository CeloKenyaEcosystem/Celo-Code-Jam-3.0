'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { statuses } from './data/data';
import { convertBlockTimestampToDate, truncateAddr } from '@/lib/utils';
import { celodevsType } from './data/schema';
import { DataTableRowActions } from './data-table-row-actions';
import DataTableColumnHeader from './data-table-column-header';
import SendFundsModal from '../modals/SendFundsModal';
import { ethers } from 'ethers';
import EditCelodevModal from '../modals/EditCelodevModal';
import DeleteCelodevModal from '../modals/DeleteCelodevModal';

const columns: ColumnDef<celodevsType>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('name')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'walletAddress',
    header: 'Address',
    cell: ({ row }) => {
      const userAddress = row.getValue('walletAddress') as string;

      return <div>{truncateAddr(userAddress)}</div>;
    },
  },
  {
    accessorKey: 'paymentCurrency',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Currency' />
    ),
  },
  {
    accessorKey: 'taskDescription',
    header: "Task"
  },
  {
    accessorKey: 'rewardAmount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Reward (cUSD)' />
    ),
    cell: ({ row }) => {
      const salary = row.getValue('rewardAmount') as number;
      const salaryInCUSD = ethers.utils.formatUnits(salary, 18);

      return <div>{salaryInCUSD.toString()} cUSD</div>;
    },
  },
  {
    accessorKey: 'dateCaptured',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Date Added' />
    ),
    cell: ({ row }) => {
      const convertedDate = row.getValue('dateCaptured') as number;

      return <div>{convertBlockTimestampToDate(convertedDate)}</div>;
    },
  },

  {
    accessorKey: 'index',
    header: 'Actions',

    cell: ({ row }) => {
      const id = row.getValue('index') as number;
      const celodev = row.original;

      return (
        <div>
          <div className='flex flex-row'>
            <EditCelodevModal id={id} celodev={celodev} />
            <DeleteCelodevModal id={id} />
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: 'index',
    header: 'Send Funds',
    cell: ({ row }) => {
      const id = row.getValue('index') as number;
      const celodev = row.original;

      return (
        <div>
          <div className='flex flex-row'>
            <SendFundsModal id={id} celodev={celodev} />
          </div>
        </div>
      );
    },
  },
];

export default columns;
