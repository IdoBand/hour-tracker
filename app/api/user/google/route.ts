// GET /api/user

import { NextRequest, NextResponse } from "next/server";
import { UserDao } from "@/daos/UserDao";
import { User } from "@/redux/dummyUser";
import prisma from "@/prisma/client";

const dao = new UserDao()

export async function POST(req: NextRequest, res: NextResponse , context: {}) {
    
    try {
        const body: User = await req.json()
        const time = dao.getNowDate()

        const result = await prisma.users.upsert({
            where: { id: body.email },
            update: { lastLogin: time },
            create: {
              id: body.email,
              email: body.email,
              firstName: body.name,
              lastName: body.name,
              firstLogin: time,
              lastLogin: time,
            },
          });
        
        return NextResponse.json({success: true}, { status: 200 })
    } catch (e) {
        console.log('Error occurred while Sign In Request');
        console.log(e);
        
        return NextResponse.json({success: false}, { status: 500 })
    }
}