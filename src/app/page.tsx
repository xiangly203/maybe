import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';


interface Transaction {
    id: number;
    title: string;
    amount: number;
    date: string;
}

export default async function Page() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const headers = apiKey ? new Headers({ 'X-API-KEY': apiKey }) : undefined;

  const response = await fetch(
    'https://api.xyi203.dev/transaction/list?start_at=2024-10-01&end_at=2024-11-01',
    {
      headers: headers,
    }
  );
  const result = await response.json();
  const transactions = result.data;

  return (
      <Table className="content-center">
        <TableCaption>A list of Transaction.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction: Transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.title}</TableCell>
            <TableCell>{transaction.amount}</TableCell>
            <TableCell>{transaction.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      </Table>
  );
}
