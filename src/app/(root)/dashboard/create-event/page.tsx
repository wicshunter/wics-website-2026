"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import ProtectedRoute from "../../../../components/ProtectedRoutes";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../firebase.js";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Page() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    description: "",
    coverImage: "",
    gallery: [""],
  });
  const [tempFiles, setTempFiles] = useState<FileList>();
  const [tempCoverImage, setTempCoverImage] = useState<File>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name != "gallery" && name != "coverImage")
      setFormData((prev) => ({ ...prev, [name]: value }));
    else if (name == "coverImage") {
      const { files } = e.target;
      if (!files) return;
      const file = files[0];
      setTempCoverImage(file);
    } else {
      const { files } = e.target;
      if (!files) return;
      setTempFiles(files);
    }
  };

  const handleDescription = (text: string) => {
    setFormData((prev) => ({ ...prev, description: text }));
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let urls: string[] = [];
      if (tempFiles) {
        urls = await convertURL(tempFiles);
      }

      let coverImageUrl: string | null = null;
      if (tempCoverImage) {
        coverImageUrl = await uploadPic(tempCoverImage);
      }

      const docRef = await addDoc(collection(db, "events"), {
        ...formData,
        coverImage: coverImageUrl,
        gallery: urls,
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

  console.log(formData);

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
              <label htmlFor="startTime">Start Time</label>
              <input
                type="time"
                name="startTime"
                id="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex gap-x-5">
              <label htmlFor="endTime">End Time</label>
              <input
                type="time"
                name="endTime"
                id="endTime"
                value={formData.endTime}
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
              <ReactQuill
                id="description"
                theme="snow"
                value={formData.description}
                onChange={handleDescription}
              />
            </div>

            <div>
              <h2>Gallery</h2>
              <input
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                name="gallery"
                multiple
              />
            </div>

            <div>
              <h2>Cover Image</h2>
              <input
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                name="coverImage"
              />
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </ProtectedRoute>
  );
}
