// /api/workPlace/delete
import { NextRequest, NextResponse } from "next/server";
import { WorkPlace } from "@/app/dashboard/WorkPlace";
import { workPlaceDao } from "../../../../daos/WorkPlaceDao";

export async function POST(req: Request, res: NextResponse , context: {}) {

    try {
        const body: any = await req.json()
        
        const response = await workPlaceDao.deleteWorkPlace(body.ids)
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