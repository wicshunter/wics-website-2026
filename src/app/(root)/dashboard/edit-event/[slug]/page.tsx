"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import ProtectedRoute from "../../../../../components/ProtectedRoutes";
import { useParams } from "next/navigation";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { getDoc, doc, addDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "../../../../../firebase.js";
import { useRouter } from 'next/navigation'

export default function Page() {
  const { slug } = useParams<{ slug: string }>();
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    description: "",
    coverImage: "",
    gallery: [""],
    status: "draft",
  });
  const [tempFiles, setTempFiles] = useState<FileList>();
  const [tempCoverImage, setTempCoverImage] = useState<File>();
  const [statusValue, setStatusValue] = useState("draft");
  const template: string = `# Heading 1
      ## Heading 2
      Paragraph

      ### Heading 3
      Basic text can be formatted in various ways:
      - **Bold text** using \`**text**\`
      - *Italic text* using \`*text*\`
      - ***Bold and italic*** using \`***text***\`
      - ~~Strikethrough~~ using \`~~text~~\`
      - \`inline code\` using backticks

      ### Code Blocks with Syntax Highlighting

      ${"```typescript"}
      // Advanced TypeScript Example
      interface Document {
        id: string;
        title: string;
        content: string;
        lastModified: Date;
        metadata?: {
          author: string;
          tags: string[];
        };
      }
      ${"```"}

      ### Lists

      - List Item 1
      - List Item 2 

      1. Number 1
      2. Number 2

      ### Links and Images

      Visit our [Documentation](https://mdcode.io/docs) for more details.

      ![Editor Screenshot](url)

      ### 📝 Advanced Features
      **Keyboard Shortcuts**
        - \`Ctrl/Cmd + B\` for bold
        - \`Ctrl/Cmd + I\` for italic
        - \`Ctrl/Cmd + K\` for links
        - \`Ctrl/Cmd + S\` to save

      > 💡 **Pro Tip:** Use the toolbar buttons or keyboard shortcuts for faster editing.

      ### 📁 Project Structure

      ${"```"}
      mdcode/
      ├── src/
      │   ├── components/
      │   │   ├── Editor/
      │   │   ├── Preview/
      │   │   └── Toolbar/
      │   ├── hooks/
      │   └── utils/
      ├── public/
      └── package.json
      ${"```"}
      `;
  const router = useRouter();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name != "gallery" && name != "coverImage")
      setFormData((prev) => ({ ...prev, [name]: value }));
    else if (name === "coverImage") {
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

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const docRef = doc(db, "events", slug);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          let temp = {
            name: docSnap.data().name || "",
            date: docSnap.data().date || "",
            startTime: docSnap.data().startTime || "",
            endTime: docSnap.data().endTime || "",
            location: docSnap.data().location || "",
            description: docSnap.data().description || "",
            coverImage: docSnap.data().coverImage || "",
            gallery: docSnap.data().gallery || [""],
            status: docSnap.data().status || "",
          };
          setFormData(temp);
        } else {
          console.log("No such document!");
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchDocument();
  }, []);
  console.log(slug);

  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, description: e.target.value }));
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Overrides the gallery and cover image 
      let urls: string[] = [];
      if (tempFiles) {
        urls = await convertURL(tempFiles);
      }

      let coverImageUrl: string | null = null;
      if (tempCoverImage) {
        coverImageUrl = await uploadPic(tempCoverImage);
      }

      const docRef = await updateDoc(doc(db, "events", slug), {
        ...formData,
        coverImage: coverImageUrl,
        gallery: urls,
      });
      router.push( `dashboard/`);
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

  const handleStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatusValue((event.target as HTMLInputElement).value);
    setFormData((prev) => ({
      ...prev,
      status: (event.target as HTMLInputElement).value,
    }));
  };

  console.log(formData);

  return (
    <ProtectedRoute>
      <Card className="rounded-md p-5 font-inter ml-[25%] mr-[25%] mt-[5%] mb-[10%] w-fit justify-self-center">
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

            <div className="flex flex-col gap-x-5">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleDescription}
                className="border-2 min-h-[300px] min-w-[600px]"
                placeholder={template}
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

            <div>
              <FormControl>
                <FormLabel>Status</FormLabel>
                <RadioGroup row value={statusValue} onChange={handleStatus}>
                  <FormControlLabel
                    value="published"
                    control={<Radio />}
                    label="Publish"
                  />
                  <FormControlLabel
                    value="draft"
                    control={<Radio />}
                    label="Draft"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <Button type="submit">Update</Button>
          </form>
        </CardContent>
      </Card>
    </ProtectedRoute>
  );
}