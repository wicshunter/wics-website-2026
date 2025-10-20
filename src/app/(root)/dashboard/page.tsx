"use client";
import { useState, useEffect } from "react";
import ProtectedRoute from "../../../components/ProtectedRoutes";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { setDoc, doc } from "firebase/firestore";
import { auth } from "../../../firebase";
import { db } from "../../../firebase.js";
import { useRouter } from "next/navigation";
import axios from "axios";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [media, setMedia] = useState("");
  const [allEvents, setAllEvents] = useState([{}]);
  const [events, setEvents] = useState([{}]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalDraft, setTotalDraft] = useState(0);
  const [totalPublished, setTotalPublished] = useState(0);
  const [totalPhotos, setTotalPhotos] = useState(0);
  const [textValue, setTextValue] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const getEvents = async () => {
      const querySnapshot = await getDocs(collection(db, "events"));
      const eventsArray = [{}];
      querySnapshot.forEach((doc) => {
        eventsArray.push({ id: doc.id, data: doc.data() });
      });

      eventsArray.shift();
      setEvents(eventsArray);
      setAllEvents(eventsArray);
      setTotalEvents(eventsArray.length);
      setTotalDraft(
        eventsArray.filter((e) => e.data?.status === "draft").length
      );
      setTotalPublished(
        eventsArray.filter((e) => e.data?.status === "published").length
      );

      let photoCount = 0;
      eventsArray.forEach((e) => {
        photoCount += e.data?.gallery?.length || 0;
      });
      setTotalPhotos(photoCount);
    };

    getEvents();
  }, []);
  console.log(events);

  // Keeping this here in case we need in future.
  const AddToWhiteList = async () => {
    try {
      await setDoc(doc(db, "whitelist", email), { email });
    } catch (err: any) {
      console.error("Cant add to whitelist", err);
      setError(err.message || "Something went wrong.");
    }
  };

  const handleTextChange = (_event: React.SyntheticEvent, newValue: number) =>
    setTextValue(newValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleKeyChange = (e: KeyboardEvent) => {
    if (e.key == "Enter") {
      setTextValue(0);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <div className="font-inter mx-auto max-w-7xl px-6 py-8 flex flex-col gap-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-[2rem] md:text-[2.4rem]">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Manage event blogs, highlights, and photos
              </p>
            </div>
            <Button
              className="bg-hotpink hover:bg-[#be185d] text-white"
              onClick={() => router.push("/dashboard/create-event")}
            >
              + Create New Event
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 rounded-2xl shadow-md bg-white">
              <p className="text-2xl font-bold text-hotpink mb-1">
                {totalEvents}
              </p>
              <p className="text-gray-600 text-sm">Total Events</p>
            </Card>

            <Card className="p-6 rounded-2xl shadow-md bg-white">
              <p className="text-2xl font-bold text-hotpink mb-1">
                {totalPublished}
              </p>
              <p className="text-gray-600 text-sm">Published</p>
            </Card>

            <Card className="p-6 rounded-2xl shadow-md bg-white">
              <p className="text-2xl font-bold text-hotpink mb-1">
                {totalDraft}
              </p>
              <p className="text-gray-600 text-sm">Drafts</p>
            </Card>

            <Card className="p-6 rounded-2xl shadow-md bg-white">
              <p className="text-2xl font-bold text-hotpink mb-1">
                {totalPhotos}
              </p>
              <p className="text-gray-600 text-sm">Total Photos</p>
            </Card>
          </div>

          {/* Event Blogs */}
          <Card className="p-6 rounded-2xl shadow-md bg-white">
            {/* Top row: title + search */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="font-bold text-2xl">Event Blogs</h2>
              <input
                type="text"
                placeholder="Search events..."
                className="h-10 w-full sm:w-72 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hotpink"
                onChange={(e) => {
                  const value = e.target.value.toLowerCase();
                  setSearchInput(value);
                  if (value === "") {
                    setEvents(allEvents);
                  } else {
                    setEvents(
                      allEvents.filter((event) =>
                        event.data?.name?.toLowerCase().includes(value)
                      )
                    );
                  }
                }}
              />
            </div>

            {/* Toggle */}
            <div className="bg-gray-100 rounded-lg w-fit mb-10 p-1">
              <Tabs
                value={textValue}
                onChange={handleTextChange}
                sx={{
                  "& .MuiTab-root": {
                    fontFamily: "inter",
                    textTransform: "none",
                    mx: 1,
                    minHeight: "40px",
                    "&:hover": {
                      backgroundColor: "#f2f2f2",
                      color: "#000",
                    },
                    "&.Mui-selected": {
                      color: "#000000",
                      backgroundColor: "#FFFFFF",
                      padding: "0px",
                      borderRadius: "6px",
                    },
                  },
                  "& .MuiTabs-scroller": {
                    display: "flex",
                    alignItems: "center",
                    minHeight: "auto",
                    height: "auto",
                  },
                  "& .MuiTabs-indicator": {
                    display: "none",
                  },
                }}
              >
                <Tab
                  label="All Events"
                  sx={{
                    fontWeight: 600,
                    "&.Mui-selected": {
                      boxShadow: "0px 1px 2px 0px rgba(66, 68, 90, 0.05)",
                    },
                  }}
                />
                <Tab
                  label="Published"
                  sx={{
                    fontWeight: 600,
                    "&.Mui-selected": {
                      boxShadow: "0px 1px 2px 0px rgba(66, 68, 90, 0.05)",
                    },
                  }}
                />
                <Tab
                  label="Draft"
                  sx={{
                    fontWeight: 600,
                    "&.Mui-selected": {
                      boxShadow: "0px 1px 2px 0px rgba(66, 68, 90, 0.05)",
                    },
                  }}
                />
              </Tabs>
            </div>

            {/* Tables */}
            {textValue === 0 && (
              <div className="flex flex-col flex-1 gap-1 h-full w-full">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-500">
                        <th className="text-left py-3 px-4">Event Title</th>
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Category</th>
                        <th className="text-left py-3 px-4">Photos</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.map((e, idx) => (
                        <tr key={idx} className="border-t">
                          <td className="py-4 px-4 font-medium text-gray-900">
                            {e.data?.name}
                          </td>
                          <td className="py-4 px-4 text-gray-700">
                            {e.data?.date}
                          </td>
                          <td className="py-4 px-4 text-gray-700">
                            {e.data?.category}
                          </td>
                          <td className="py-4 px-4 text-gray-700">
                            {e.data?.gallery?.length}
                          </td>
                          <td className="py-4 px-4">
                            {e.data?.status === "published" ? (
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                Published
                              </Badge>
                            ) : (
                              <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                                Draft
                              </Badge>
                            )}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button
                              type="button"
                              aria-label="More actions"
                              className="p-2 rounded-md hover:bg-gray-100"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-5 h-5 text-gray-600"
                              >
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {textValue === 1 && (
              <div className="flex flex-col flex-1 gap-1 h-full w-full">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-500">
                        <th className="text-left py-3 px-4">Event Title</th>
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Category</th>
                        <th className="text-left py-3 px-4">Photos</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events
                        .filter((e) => e.data?.status === "published")
                        .map((e, idx) => (
                          <tr key={idx} className="border-t">
                            <td className="py-4 px-4 font-medium text-gray-900">
                              {e.data?.name}
                            </td>
                            <td className="py-4 px-4 text-gray-700">
                              {e.data?.date}
                            </td>
                            <td className="py-4 px-4 text-gray-700">
                              {e.data?.category}
                            </td>
                            <td className="py-4 px-4 text-gray-700">
                              {e.data?.gallery?.length}
                            </td>
                            <td className="py-4 px-4">
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                Published
                              </Badge>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <button
                                type="button"
                                aria-label="More actions"
                                className="p-2 rounded-md hover:bg-gray-100"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  className="w-5 h-5 text-gray-600"
                                >
                                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {textValue === 2 && (
              <div className="flex flex-col flex-1 gap-1 h-full w-full">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-500">
                        <th className="text-left py-3 px-4">Event Title</th>
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Category</th>
                        <th className="text-left py-3 px-4">Photos</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events
                        .filter((e) => e.data?.status === "draft")
                        .map((e, idx) => (
                          <tr key={idx} className="border-t">
                            <td className="py-4 px-4 font-medium text-gray-900">
                              {e.data?.name}
                            </td>
                            <td className="py-4 px-4 text-gray-700">
                              {e.data?.date}
                            </td>
                            <td className="py-4 px-4 text-gray-700">
                              {e.data?.category}
                            </td>
                            <td className="py-4 px-4 text-gray-700">
                              {e.data?.gallery?.length}
                            </td>
                            <td className="py-4 px-4">
                              <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                                Draft
                              </Badge>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <button
                                type="button"
                                aria-label="More actions"
                                className="p-2 rounded-md hover:bg-gray-100"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  className="w-5 h-5 text-gray-600"
                                >
                                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
