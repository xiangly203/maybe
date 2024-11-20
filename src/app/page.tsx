"use client";
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
  title: z.string().min(1, "标题不能为空"),
  amount: z.string().min(1, "金额不能为空").refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    "请输入有效的正数金额"
  )
})

export default function Page() {
  const [open, setOpen] = React.useState(false);
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      amount: ""
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await fetch('/api/transaction/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: data.title, 
          amount: Number(data.amount) 
        }),
      });
      const result = await res.json();
      
      if (result.ok) {
        toast({ description: '提交成功' });
        form.reset();
        setOpen(false);
      } else {
        toast({ description: '提交失败' });
      }
    } catch (error) {
      toast({ description: '提交失败' });
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>添加交易</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>请输入标题和金额</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>标题</FormLabel>
                    <FormControl>
                      <Input placeholder="输入标题" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>金额</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="输入金额" 
                        type="number" 
                        step="0.01"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  取消
                </Button>
                <Button type="submit">提交</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  );
}