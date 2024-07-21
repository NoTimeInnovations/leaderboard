// fetch user if=d and role
import {verifyToken} from '../../../utils/jwt'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { NextResponse } from 'next/server'

export async function GET(req) {
    const token = req.cookies.get('token').value;
    console.log(token);

    try{
        if(token){
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            const { payload } = await jwtVerify(token, secret);
            const {userId, role} = payload;
            console.log(userId, role);
            return NextResponse.json({userId, role}, {status: 200});
        }
        else {
            return NextResponse.json({ error: 'No token provided' }, { status: 401 });
          }
    }
    catch(error){
        console.error(error);
        return NextResponse.json({error: 'Failed to fetch user' }, { status: 500 });
    }



    
}