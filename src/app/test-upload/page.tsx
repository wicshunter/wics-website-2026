"use client";

import { useState } from "react";
import ImageUpload from "@/components/ImageUpload";

export default function TestUploadPage() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Cloudinary Upload</h1>

      <ImageUpload onUploadComplete={setImageUrl} />

      {imageUrl && (
        <div className="mt-6">
          <p className="mb-2 text-sm text-gray-700">Uploaded URL:</p>
          <a
            href={imageUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline break-all"
          >
            {imageUrl}
          </a>

          <img
            src={imageUrl}
            alt="Uploaded preview"
            className="mt-4 max-w-md rounded border"
          />
        </div>
      )}
    </div>
  );
}