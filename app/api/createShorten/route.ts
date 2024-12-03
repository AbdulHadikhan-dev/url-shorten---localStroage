import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
// Assuming db.ts is in the lib folder

interface Body {
  url: string;
  shortUrl: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Body | null;
    console.log(body);

    const client = await clientPromise;
    const db = client.db("url");
    const collection = db.collection("shorten");
    const findDoc = await collection.findOne({ shorten: body?.shortUrl });
    console.log(findDoc);
    if (findDoc) {
      return NextResponse.json({ message: "Shorten already exists" });
    }

    const result = await collection.insertOne({
      url: body?.url,
      shorten: body?.shortUrl,
    });

    return NextResponse.json({
      message: "Create shorten successfully",
      result,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch data", err },
      { status: 500 }
    );
  }
}
