"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import ProtectedRoute from "../../../../components/ProtectedRoutes";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../firebase.js";
import axios from "axios";
import { Key } from "lucide-react";

export default function Page() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    description: "",
    imageUrl: [""],
  });
  const [tempFiles, setTempFiles] = useState<FileList>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name != "media") setFormData((prev) => ({ ...prev, [name]: value }));
    else {
      const { files } = e.target;
      if (!files) return;
      setTempFiles(files);
    }
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let urls: string[] = [];
      if (tempFiles) {
        urls = await convertURL(tempFiles);
      }

      const docRef = await addDoc(collection(db, "events"), {
        ...formData,
        imageUrl: urls,
      });

      console.log("Document ID: ", docRef.id);
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  const convertURL = async (files: FileList) => {
    if (!files) return [];

    const fileArray = Array.from(files);
    const urls = await Promise.all(fileArray.map((file) => uploadPic(file)));

    return urls.filter((url): url is string => Boolean(url));
  };

  const uploadPic = async (file: File) => {
    try {
      const form = new FormData();
      form.append("file", file);
      form.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        form
      );

      console.log("URL: ", res.data.secure_url);
      return res.data.secure_url;
    } catch (error: any) {
      console.error("ERROR: ", error.response?.data || error);
      return null;
    }
  };

  return (
    <ProtectedRoute>
      <Card className="rounded-md p-5 font-inter ml-[10%] mr-[10%] mt-[5%] mb-[10%] w-fit justify-self-center">
        <CardContent>
          <form className="flex flex-col gap-y-10" onSubmit={submitForm}>
            <div className="flex gap-x-5">
              <label htmlFor="name">Event Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex gap-x-5">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex gap-x-5">
              <label htmlFor="time">Time</label>
              <input
                type="time"
                name="time"
                id="time"
                value={formData.time}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex gap-x-5">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex gap-x-5">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              name="media"
              multiple
            />

            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </ProtectedRoute>
  );
}
