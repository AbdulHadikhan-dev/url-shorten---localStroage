import { NextRequest, NextResponse } from "next/server";
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

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { shortUrl: string };
    const client = await clientPromise;
    const db = client.db("url");
    const collection = db.collection("shorten");
    const shorten = await collection.findOne({ shorten: body.shortUrl });
    if (!shorten)
      return NextResponse.json({ success: false, message: "No results Found" });

    return NextResponse.json({
      success: true,
      message: "Found Successfully",
      shorten,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch data", err },
      { status: 500 }
    );
  }
}
