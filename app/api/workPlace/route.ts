// /api/workPlace

import { NextRequest, NextResponse } from "next/server";
import { WorkPlace } from "@/types/types";
import { workPlaceDao } from "../../../daos/WorkPlaceDao";

// Add a work place 
export async function POST(req: NextRequest, res: NextResponse , context: {}) {
    
    try {
        const body: any = await req.json()
        const response = await workPlaceDao.addWorkPlace(body)
 
        return NextResponse.json(
            {
                success: true,
                workPlace: response
            }, 
            { status: 200 })
    } catch (e) {
        console.log('Error occurred while Add Work Place Request');
        console.log(e);
        return NextResponse.json({success: false}, { status: 500 })
    }
}