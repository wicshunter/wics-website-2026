"use client";
import { useState } from "react";
import ProtectedRoute from "../../../components/ProtectedRoutes";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { setDoc, doc } from "firebase/firestore";
import { auth } from "../../../firebase";
import { db } from "../../../firebase.js";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "published" | "drafts">("all");
  const [media, setMedia] = useState("");

  // Keeping this here in case we need in future.
  const AddToWhiteList = async () => {
    try {
      await setDoc(doc(db, "whitelist", email), { email });
    } catch (err: any) {
      console.error("Cant add to whitelist", err);
      setError(err.message || "Something went wrong.");
    }
  };

  const stats = [
    { number: "15", label: "Total Events" },
    { number: "8", label: "Published" },
    { number: "6", label: "Drafts" },
    { number: "142", label: "Total Photos" },
  ];

  const events = [
    { title: "Web Development Workshop", date: "Mar 15, 2024", category: "Workshop", photos: 24, status: "Published" as const },
    { title: "Web Development Workshop", date: "Apr 02, 2024", category: "Talk", photos: 18, status: "Published" as const },
    { title: "Web Development Workshop", date: "May 10, 2024", category: "Hackathon", photos: 36, status: "Draft" as const },
    { title: "Web Development Workshop", date: "Jun 21, 2024", category: "Workshop", photos: 12, status: "Published" as const },
    { title: "Web Development Workshop", date: "Jul 05, 2024", category: "Panel", photos: 9, status: "Draft" as const },
  ];

  const filtered =
    activeTab === "all"
      ? events
      : events.filter((e) =>
          activeTab === "published" ? e.status === "Published" : e.status === "Draft"
        );

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <div className="font-inter mx-auto max-w-7xl px-6 py-8 flex flex-col gap-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-[2rem] md:text-[2.4rem]">Admin Dashboard</h1>
              <p className="text-gray-600">Manage event blogs, highlights, and photos</p>
            </div>
            <Button className="bg-hotpink hover:bg-[#be185d] text-white">
              + Create New Event
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 rounded-2xl shadow-md bg-white">
                <p className="text-2xl font-bold text-hotpink mb-1">{stat.number}</p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </Card>
            ))}
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
              />
            </div>

            {/* Toggle */}
            <div className="flex gap-1 p-1 bg-gray-100 rounded-lg w-fit mb-6">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-6 py-1 rounded-md transition-colors text-sm ${
                  activeTab === "all"
                    ? "bg-white text-hotpink font-semibold shadow-sm"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                All Events
              </button>
              <button
                onClick={() => setActiveTab("published")}
                className={`px-6 py-1 rounded-md transition-colors text-sm ${
                  activeTab === "published"
                    ? "bg-white text-hotpink font-semibold shadow-sm"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                Published
              </button>
              <button
                onClick={() => setActiveTab("drafts")}
                className={`px-6 py-1 rounded-md transition-colors text-sm ${
                  activeTab === "drafts"
                    ? "bg-white text-hotpink font-semibold shadow-sm"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                Drafts
              </button>
            </div>

            {/* Table */}
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
                  {filtered.map((e, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="py-4 px-4 font-medium text-gray-900">{e.title}</td>
                      <td className="py-4 px-4 text-gray-700">{e.date}</td>
                      <td className="py-4 px-4 text-gray-700">{e.category}</td>
                      <td className="py-4 px-4 text-gray-700">{e.photos}</td>
                      <td className="py-4 px-4">
                        {e.status === "Published" ? (
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
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}