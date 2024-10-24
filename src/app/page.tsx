import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';

export default async function Page() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const headers = apiKey ? new Headers({ 'X-API-KEY': apiKey }) : undefined;

  let response = await fetch(
    'https://api.xyi203.dev/transaction/list?start_at=2024-10-01&end_at=2024-11-01',
    {
      headers: headers,
    }
  );
  let result = await response.json();
  let transactions = result.data;

  return (
    <div className="container">
      <h1>Transaction List</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction: any) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.title}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
