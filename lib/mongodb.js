import mongoose from "mongoose";
import dns from "dns";

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch {
  // ignore if not permitted
}

const cache = global._mongoose || (global._mongoose = { conn: null, promise: null });

export async function db() {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not set");
  if (cache.conn) return cache.conn;
  cache.promise ||= mongoose.connect(process.env.MONGODB_URI, {
    bufferCommands: false,
    serverSelectionTimeoutMS: 8000,
  });
  cache.conn = await cache.promise;
  return cache.conn;
}
