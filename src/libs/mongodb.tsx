import mongoose from "mongoose";
const connectionString = process.env.MONGODB_URI || "mongodb://localhost:27017/nextjs-topic";
const connectMongoDB = async () => {
    try {
        mongoose.connect(connectionString);
        console.log("Connected to database");
    } catch(error) {
        console.log(error);
    }
}
export default connectMongoDB;