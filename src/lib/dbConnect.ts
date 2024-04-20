import mongoose from "mongoose";


type ConnectionObect = {
    isConnected?: number
}

const connection: ConnectionObect = {}

async function dbConnect(): Promise<void> {
    // 1.  if already connected
    if (connection.isConnected) {                           
        console.log("Already connected to database");
        return
    }

    // 2.  for the first time
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {})
        console.log(db);

        connection.isConnected = db.connections[0].readyState

        console.log("DB Connected Successfully");
        
        
    } catch (error) {
        
        console.log("Database connection failed", error);

        process.exit(1)
    }
}

export default dbConnect




// ----------------   NOTE   -------------------- //

//  Because of Nextjs have -> Edge time enviroment
//  means chijen isme seprately hoti hai like 
//  agar user kuch demand karega tabhi ye connect hoga
//  isme humesha database connect nhi rhta like others
//  toh isme jab user kuch request karega tabhi ye connect hoga

//  isiliye hume 2 tareeke se database likhna padega isme
//  1.  database already connected hai
//  2.  ya pehli baar database connect ho rha hai

