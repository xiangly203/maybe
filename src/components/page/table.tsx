"use client";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';


interface Transaction {
    id: number;
    title: string;
    amount: number;
    date: string;
}

export default async function OutcomeTable() {
    // 获取交易列表数据
    const response = await fetch(`/api/transaction/list`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ start_at: "2024-11-01", end_at: "2024-11-19" }),
    })
    const res = await response.json()
    const transactions = res.data
    console.log(transactions)

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
