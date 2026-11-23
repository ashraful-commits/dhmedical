import mongoose from "mongoose";
import dns from "dns";

// Fix Node.js DNS SRV resolution on Windows for MongoDB Atlas
try {
  if (typeof dns.setDefaultResultOrder === "function") {
    dns.setDefaultResultOrder("ipv4first");
  }
  dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
} catch {
  // ignore if network interface restricts custom resolver
}

const cache = global._mongoose || (global._mongoose = { conn: null, promise: null });

export async function db() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not set");
  }
  if (cache.conn) return cache.conn;

  cache.promise ||= mongoose.connect(process.env.MONGODB_URI, {
    bufferCommands: false,
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  });

  try {
    cache.conn = await cache.promise;
    return cache.conn;
  } catch (err) {
    cache.promise = null;
    throw err;
  }
}
