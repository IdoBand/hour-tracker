// /api/shift

import { NextRequest, NextResponse } from "next/server";
import { shiftDao } from "../../../daos/ShiftDao";
import { shiftService } from "@/services/ShiftService";

export async function GET(req: NextRequest, res: Response, context: {}) {
    const { searchParams } = new URL(req.url)
    const year = searchParams.get('year')
    const month = searchParams.get('month')
    const workPlaceId = searchParams.get('workPlaceId')
    if (year && month) {
        try {
            const response = await shiftDao.getShiftsByMonthAndYear(+month, +year, workPlaceId as string)

            return NextResponse.json({success: true, data: response}, { status: 200 })
        } catch (e) {
            console.log('Error occurred while getting shifts');
            console.log(e);
            return NextResponse.json({success: false}, { status: 500 })
        }
    }
}



// Add a shift
export async function POST(req: NextRequest, res: NextResponse , context: {}) {
    
    try {
        const body: any = await req.json()
        console.log(`$$$$$$$$$$$$$$$$$$$$$$$$`);
        console.log(body);
        
        const response = await shiftService.addShift(body)
        if (response?.success) {
            return NextResponse.json({success: true}, { status: 200 })
        } else {
            throw new Error
        }
    } catch (e) {
        console.log('Error occurred while Add Shift Request');
        console.log(e);
        return NextResponse.json({success: false}, { status: 500 })
    }
}
