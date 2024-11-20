"use client";
import { useEffect, useState } from "react";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import { format } from "date-fns";

interface Transaction {
    id: number;
    title: string;
    amount: number;
    date: string;
}

interface OutcomeTableProps {
    start_at: string;
    end_at: string;
}

export default function OutcomeTable({ start_at, end_at }: OutcomeTableProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            const response = await fetch(`/api/transaction/list`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ start_at, end_at }),
            });
            const res = await response.json();
            setTransactions(res.data);
        };

        fetchTransactions();
    }, [start_at, end_at]);

    return (
        <Table className="content-center">
            <TableCaption>A list of Transaction.</TableCaption>
            <TableHeader>
                <TableRow className="sticky top-0 bg-white">
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
                        <TableCell>{format(new Date(transaction.date), "yyyy-MM-dd")}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
