// GET /api/user

import { NextRequest, NextResponse } from "next/server";


export async function GET(req: Request, res: NextResponse, context: {}) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    return NextResponse.json({
       id: 3
    })
}