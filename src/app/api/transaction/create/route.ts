import { NextRequest, NextResponse } from "next/server";
import config from "@/config/config";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  const { title, amount } = await request.json();

  console.log("title", title, "amount", amount);
  const url = new URL(config.transactions_add, config.base_url);
  const req = {
    title: title,
    amount: Number(amount),
    type: 0,
    kind: 0,
    currency: 0,
  };
  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
    body: JSON.stringify(req),
  });

  const data = await res.json();

  return NextResponse.json(data);
}
