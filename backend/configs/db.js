import mongoose, {mongo} from "mongoose";

const connectDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDb Connected Sucessfully: ${conn.connection.host}`.bgGreen.bold)
    } catch (error){
        console.error(`Error: ${error.message}`.bgRed.bold)
        process.exit(1)
    }
}

export default connectDb