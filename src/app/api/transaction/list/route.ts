import { NextRequest, NextResponse } from "next/server";
import config from "@/config/config";
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')

    const {start_at, end_at } = await request.json()
    const url = new URL(config.transactions_list, config.base_url)
    url.searchParams.append('start_at', start_at)
    url.searchParams.append('end_at', end_at)
    const res = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token?.value}`},
    });
    console.log(res)

    const data = await res.json();
    return NextResponse.json(data);
}