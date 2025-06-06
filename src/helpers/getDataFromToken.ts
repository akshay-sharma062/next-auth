import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";


export const getDataFromToken=(request:NextRequest)=>{
    try {
       const token = request.cookies.get("token")?.value || ""

      const decodedToken:any = jwt.verify(token,"akshaysharma")
        return decodedToken.id

    } catch (error:any) {
        throw new Error(error?.message)
    }
}