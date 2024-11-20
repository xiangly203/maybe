import {NextRequest} from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    return await fetch("", {
        headers: { "Authorization":  `Bearer ${token}` }
    })
}
