import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hasedToken = await bcrypt.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {$set:{
        verifyToken: hasedToken,
        verifyTokenExpiry: Date.now() + 360000,
      }});
    } else if (emailType == "RESET") {
      await User.findByIdAndUpdate(userId,{$set:{
        forgotPasswordTokens: hasedToken,
        forgotPasswordTokensExpiry: Date.now() + 360000,
      }});
    }

    
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        pass: "68f0b69a06023e",//❌
        user: "90cc189b2daa06",//❌
      },
    });
    const mailOption = {
      from: "kumar.akshu062@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "VERIFY your email" : "RESET YOUR PASSWORD",

      html:`<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hasedToken}">here</a> to ${emailType==="VERIFY"?"verify your email":"reset your password"} or copy and paste link in your browser. <br>
      ${process.env.DOMAIN}/verifyemail?token=${hasedToken}</p>`
    };
    const mailResponse = await transport.sendMail(mailOption);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
//crate forgot password email 