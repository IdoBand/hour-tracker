// /api/shift/delete

import { NextRequest, NextResponse } from "next/server";
import { shiftDao } from "@/daos/ShiftDao";
import { shiftService } from "@/services/ShiftService";
export async function POST(req: Request, res: NextResponse , context: {}) {

    try {
        const body: any = await req.json()
        const { searchParams } = new URL(req.url)
        const workPlaceId = searchParams.get('workPlaceId')
        const response = await shiftService.deleteShifts(body.ids, workPlaceId as string)
        if (response?.count) {
            return NextResponse.json({success: true,}, { status: 200 })
        }
        return NextResponse.json({success: false,}, { status: 404 })
    } catch (e) {
        console.log('Error occurred trying to delete Work Places');
        console.log(e);
        return NextResponse.json({success: false}, { status: 500 })
    }
}