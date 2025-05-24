import { connect } from "@/dbConfig/dbConfig";
import  User  from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";


connect()

export async function POST(request:NextRequest) {

//extract data from token

const userid = await getDataFromToken(request)
  const user = await User.findOne({_id:userid}).select("-password")
    if (!user) {
        return NextResponse.json({error:"user not found"},{status:400})  
    }
    return NextResponse.json({
        message:"user found",
        data:user
    })

}