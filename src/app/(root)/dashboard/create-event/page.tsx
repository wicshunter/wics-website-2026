"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import ProtectedRoute from "../../../../components/ProtectedRoutes";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../firebase.js";
import axios from "axios";

export default function Page() {
	const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    description: "",
    imageUrl: "",
  });

	const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

	const submitForm = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "events"), formData);
      console.log("Document ID: ", docRef.id);
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  const handleChange = async (e) => {
    const { files } = e.target;
    
    if (files && files.length > 0) {
      const file = files[0];
      const url = await uploadPic(file);
      if (url) {
        setFormData((prev) => ({ ...prev, imageUrl: url }));
      }
    }
    console.log(formData);
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
              onChange={handleChange}
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
