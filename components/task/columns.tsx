'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Task } from '@/types/task';

export const columns: ColumnDef<Task>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'inputField', // Adjust according to what this input represents
    header: 'Name', // Column header
    cell: ({ row }) => (
      <Input
        // value={row.original.inputField} // Assuming 'inputField' is part of your data model
        onChange={(e) => console.log(`New value for row ${row.id}: ${e.target.value}`)} // Replace with actual logic to update row data
        placeholder='Type here' // Optional placeholder
        className='outline-none focus:outline-none'
      />
    ),
    enableSorting: false, // Adjust based on whether you want this column to be sortable
    enableHiding: false, // Adjust based on whether you want this column to be hideable
  },
  {
    id: 'selectField', // Adjust according to what this input represents
    header: 'Goal', // Column header
    cell: ({ row }) => (
      <div className='flex space-x-2 items-center'>
        <Select>
          <SelectTrigger className=''>
            <SelectValue placeholder='Select a goal' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Goals</SelectLabel>
              <SelectItem value='goal 1'>Goal 1</SelectItem>
              <SelectItem value='goal 2'>Goal 2</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    ),
    enableSorting: false, // Adjust based on whether you want this column to be sortable
    enableHiding: false, // Adjust based on whether you want this column to be hideable
  },
  {
    id: 'selectField', // Adjust according to what this input represents
    header: 'Frequency', // Column header
    cell: ({ row }) => (
      <div className='flex space-x-2 items-center'>
        <Select>
          <SelectTrigger className=''>
            <SelectValue placeholder='Select' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {/* <SelectLabel>Fruits</SelectLabel> */}
              <SelectItem value='seven'>Daily</SelectItem>
              <SelectItem value='six'>6 times</SelectItem>
              <SelectItem value='five'>5 times</SelectItem>
              <SelectItem value='four'>4 times</SelectItem>
              <SelectItem value='three'>3 times</SelectItem>
              <SelectItem value='two'>2 times</SelectItem>
              <SelectItem value='one'>1 times</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    ),
    enableSorting: false, // Adjust based on whether you want this column to be sortable
    enableHiding: false, // Adjust based on whether you want this column to be hideable
  },
  {
    id: 'dateField',
    header: 'Due Date',
    cell: ({ row }) => (
      <div className='flex space-x-2 items-center'>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-[50px] justify-start text-left font-normal'
                // !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className='h-4 w-4' />
              {/* {date ? format(date, 'PPP') : <span>Pick a date</span>} */}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <Calendar mode='single' initialFocus />
          </PopoverContent>
        </Popover>
      </div>
    ),
    enableSorting: false, // Adjust based on whether you want this column to be sortable
    enableHiding: false, // Adjust based on whether you want this column to be hideable
  },
  {
    id: 'monday',
    header: 'Mon',
    cell: ({ row }) => (
      <div className='flex justify-center'>
        <Checkbox />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'tuesday',
    header: 'Tue',
    cell: ({ row }) => (
      <div className='flex justify-center'>
        <Checkbox />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'wednesday',
    header: 'Wed',
    cell: ({ row }) => (
      <div className='flex justify-center'>
        <Checkbox />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'thursday',
    header: 'Thu',
    cell: ({ row }) => (
      <div className='flex justify-center'>
        <Checkbox />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'friday',
    header: 'Fri',
    cell: ({ row }) => (
      <div className='flex justify-center'>
        <Checkbox />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'saturday',
    header: 'Sat',
    cell: ({ row }) => (
      <div className='flex justify-center'>
        <Checkbox />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'sunday',
    header: 'Sun',
    cell: ({ row }) => (
      <div className='flex justify-center'>
        <Checkbox />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'progress',
    header: 'Progress',
    cell: ({ row }) => (
      <div className='flex justify-center'>
        <span className='text-sm text-muted-foreground'>0%</span>
      </div>
    ),
  },
];
