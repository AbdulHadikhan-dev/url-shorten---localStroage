import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";
// Assuming db.ts is in the lib folder

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("url");
    const collection = db.collection("shorten");
    const result = await collection.find({}).toArray();
    if (result.length)
      return NextResponse.json({ length: result.length, result });

    return NextResponse.json({ message: "No results Found" });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch data", err },
      { status: 500 }
    );
  }
}
