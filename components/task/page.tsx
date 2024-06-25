import { Payment, columns } from './columns';
import { DataTable } from './data-table';

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: '1m@example.com',
    },
    {
      id: '728edx2f',
      amount: 200,
      status: 'pending',
      email: '2m@example.com',
    },
    {
      id: '728ed92f',
      amount: 300,
      status: 'pending',
      email: '3m@example.com',
    },
    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className='container pr-0 pl-0 py-10'>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
