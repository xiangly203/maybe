"use client";
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
// Import the toast component
import { toast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function Page() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [amountError, setAmountError] = useState(false);

  const handleSubmit = async () => {
    // Reset error states
    setTitleError(false);
    setAmountError(false);

    // Validate inputs
    if (!title.trim()) {
      setTitleError(true);
      toast({ description: '请输入标题' });
      return;
    }
    if (!amount) {
      setAmountError(true);
      toast({ description: '请输入金额' });
      return;
    }

    try {
      const res = await fetch('/api/transaction/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, amount }),
      });
      const data = await res.json();
      toast({ description: data.ok || '提交成功' });
      // Clear form fields after successful submission
      setTitle('');
      setAmount('');
    } catch (error) {
      toast({ description: '提交失败' });
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>请输入标题和金额</AlertDialogTitle>
          </AlertDialogHeader>
          <div>
            <label>标题</label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setTitleError(false);
              }}
              style={{ borderColor: titleError ? 'red' : undefined }}
            />
            <label>金额</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setAmountError(false);
              }}
              style={{ borderColor: amountError ? 'red' : undefined }}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>提交</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toaster />
    </>
  );
}
