"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { DateRange } from "react-day-picker"
import { z } from "zod"
import { useState } from "react"
import OutcomeTable from "./table" // 导入 OutcomeTable 组件

import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const FormSchema = z.object({
  dateRange: z.object({
    from: z.date().nullable(),
    to: z.date().nullable(),
  }).nullable(),
})

export function DateRangePickerForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dateRange: {
        from: new Date(),
        to: addDays(new Date(), 7),
      },
    },
  })

  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setDateRange(data.dateRange)
    // 这里可以添加其他提交后的处理逻辑
  }

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 bg-white z-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="dateRange"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>选择日期范围</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value?.from ? (
                            field.value.to ? (
                              <>
                                {format(field.value.from, "LLL dd, y")} -{" "}
                                {format(field.value.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(field.value.from, "LLL dd, y")
                            )
                          ) : (
                            <span>选择日期范围</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={field.value?.from}
                        selected={field.value}
                        onSelect={field.onChange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    请选择活动的日期范围。
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">提交</Button>
          </form>
        </Form>
      </div>
      {dateRange && (
        <OutcomeTable
          start_at={dateRange.from ? format(dateRange.from, "yyyy-MM-dd") : ""}
          end_at={dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : ""}
        />
      )}
    </div>
  )
}

