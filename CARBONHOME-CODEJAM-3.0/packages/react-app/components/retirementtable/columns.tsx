'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { statuses } from './data/data';
import { DataTableRowActions } from './data-table-row-actions';
import DataTableColumnHeader from './data-table-column-header';
import { ethers } from 'ethers';
import { retirementsType } from './data/schema';
import { UserRetirementsResponse } from 'toucan-sdk';
import { Item } from '@radix-ui/react-dropdown-menu';


const columns: ColumnDef<UserRetirementsResponse>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'token',
    header: 'Token Name',
    cell: ({ row }) => {
      const token = row.getValue('token') as { name: string };
      console.log(token);

      return <div>{token.name}</div>;
    },
  },
  {
    accessorKey: 'token',
    header: 'Token Symbol',
    cell: ({ row }) => {
      const token = row.getValue('token') as { symbol: string };
      console.log(token);

      return <div>{token.symbol}</div>;
    },
  },
  {
    accessorKey: 'Creation Tx',
    header: 'Creation Tx',
    cell: ({ row }) => {
      const tx = row.getValue('creationTx') as string;

      return <div>{tx?.substring(tx.length - 15)}</div>;
    },
  },

  //   {
  //     accessorKey: 'token',
  //     header: 'Token Symbol',
  //     cell: ({ row }) => {
  //       const token = row.getValue('token') as [];

  //       return (
  //         <div>
  //           {token?.map((item, index) => (
  //             <div key={index}>{item.symbol}</div>
  //           ))}
  //         </div>
  //       );
  //     },
  //   },
  //   {
  //     accessorKey: 'taskDescription',
  //     header: 'Task',
  //   },
  //   {
  //     accessorKey: 'rewardAmount',
  //     header: ({ column }) => (
  //       <DataTableColumnHeader column={column} title='Reward (cUSD)' />
  //     ),
  //     cell: ({ row }) => {
  //       const salary = row.getValue('rewardAmount') as number;
  //       const salaryInCUSD = ethers.utils.formatUnits(salary, 18);

  //       return <div>{salaryInCUSD.toString()} cUSD</div>;
  //     },
  //   },
  //   {
  //     accessorKey: 'dateCaptured',
  //     header: ({ column }) => (
  //       <DataTableColumnHeader column={column} title='Date Added' />
  //     ),
  //     cell: ({ row }) => {
  //       const convertedDate = row.getValue('dateCaptured') as number;

  //       return <div>{convertBlockTimestampToDate(convertedDate)}</div>;
  //     },
  //   },
];

export default columns;
