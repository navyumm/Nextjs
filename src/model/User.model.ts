import mongoose, { Schema, Document } from "mongoose";    // document for type safety iske liye interface lagta hai

export interface Message extends Document{
    content: string;
    createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type : String,
        required : true
    },
    createdAt: {
        type : Date,
        required : true,
        default : Date.now
    }
})

// for userSchema

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[]
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type : String,
        required : [true, "Username is required"],
        trim: true,
        unique: true
    },
    email: {
        type : String,
        required : [true, "Email is required"],
        unique : true,
        match : [/.+\@.+\..+/, "please use a vaild email address"]   // first regExr hai
    },
    password: {
        type : String,
        required : [true, "Password is required"]
    },
    verifyCode: {
        type : String,
        required : [true, "Verify Code is required"]
    },
    verifyCodeExpiry: {
        type : Date,
        required : [true, "Verify code  Expiry is required"]
    },
    isVerified: {
        type : Boolean,
        default : false
    },
    isAcceptingMessage: {
        type : Boolean,
        default : false
    },
    messages: [MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel;


//  yaha pr hum do tarike se export isiliye kar rhe hai kyoki Nextjs edge par chalti hai
//  isko nhi pta ki ye phle export ho chuka hai ya nhi 
//  isiliye hume dono case likhne padhte hai
//  first agar phle se export ho gya hai uske liye
//  second ki hum fist time export kar rhe hai uss way me