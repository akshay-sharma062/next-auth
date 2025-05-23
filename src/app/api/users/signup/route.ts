import { connect } from "@/dbConfig/dbConfig";
import  User  from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";


connect()

export async function POST(request:NextRequest) {

    try {

        const reqBody =await request.json()
        const  {username,email,password}= reqBody
        console.log(reqBody)

      const user = await User.findOne({email})

            if (user) {
                return NextResponse.json({error:"user already exsits"},{status:400})
                
            }
            const salt = await bcryptjs.genSalt(10)
            const haeshedPassword= await bcryptjs.hash(password,salt) 
               const newUser = new User({
                    username,
                    password:haeshedPassword,
                    email
                })
               const savedUser = await newUser.save()
               console.log(savedUser)
               //send verification
               await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})
                return NextResponse.json({
                    message:"user registerd succsesfully",
                    success:true,
                    savedUser
                })

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}
