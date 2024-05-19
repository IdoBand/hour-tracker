// /api/workPlace/delete
import { NextRequest, NextResponse } from "next/server";
import {
  WorkPlaceService,
  workPlaceService,
} from "@/services/WorkPlaceService";
export async function POST(req: Request, res: NextResponse, context: {}) {
  try {
    const body: any = await req.json();

    const response = await workPlaceService.deleteWorkPlaces(body.ids);

    if (response) {
      return NextResponse.json({ success: true }, { status: 200 });
    }
    return NextResponse.json({ success: false }, { status: 400 });
  } catch (e) {
    console.log("Error occurred trying to delete Work Places");
    console.log(e);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
