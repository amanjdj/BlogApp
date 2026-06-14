import mongoose from "mongoose";

function connectMongo(url) {
  return mongoose.connect(url);
}

export { connectMongo };
