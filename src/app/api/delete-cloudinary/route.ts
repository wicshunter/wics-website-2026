import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const { publicIds } = await req.json();

    if (!publicIds || publicIds.length === 0) {
      return NextResponse.json({ error: "No public IDs provided" }, { status: 400 });
    }

    const result = await cloudinary.api.delete_resources(publicIds);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return NextResponse.json({ error: "Failed to delete Cloudinary images" }, { status: 500 });
  }
}
