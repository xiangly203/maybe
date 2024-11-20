import {NextRequest} from "next/server";
import { cookies } from "next/headers";

export async function handler(request: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    return await fetch("", {
        headers: { "Authorization":  `Bearer ${token}` }
    })
}
