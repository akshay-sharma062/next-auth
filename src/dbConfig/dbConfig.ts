import mongoose from "mongoose";


export async function connect() {
  try {
    mongoose.connect('mongodb://localhost:27017/nextauth');
    const connection = mongoose.connection;
    connection.on('connected',()=>{
        console.log('mongoDb Connected')
    })
    connection.on('err',(err)=>{
        console.log('mongoDb connection err'+err)
        process.exit()
    })

  } catch (err) {
    console.log("something went wrong in database connection");
    console.log(err);
  }
}
