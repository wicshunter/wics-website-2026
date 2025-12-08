"use client";
import { useState, useEffect } from "react";
import ProtectedRoute from "../../../components/ProtectedRoutes";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { db } from "../../../firebase.js";
import { useRouter } from "next/navigation";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import EventTable from "@/components/EventTable";

interface EventType {
  id: string;
  data: {
    name?: string;
    status?: string;
    coverImage?: string;
    gallery?: any[];
    [key: string]: any;
  };
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"all" | "published" | "drafts">("all");
  const { AddToWhiteList, error } = useWhitelist();

  const stats = [
    { number: "15", label: "Total Events" },
    { number: "8", label: "Published" },
    { number: "6", label: "Drafts" },
    { number: "142", label: "Total Photos" },
  ];

  const events = [
    { title: "Web Development Workshop", date: "Mar 15, 2024", category: "Workshop", photos: 24, status: "Published" },
    { title: "Web Development Workshop", date: "Apr 02, 2024", category: "Talk", photos: 18, status: "Published" },
    { title: "Web Development Workshop", date: "May 10, 2024", category: "Hackathon", photos: 36, status: "Draft" },
    { title: "Web Development Workshop", date: "Jun 21, 2024", category: "Workshop", photos: 12, status: "Published" },
    { title: "Web Development Workshop", date: "Jul 05, 2024", category: "Panel", photos: 9, status: "Draft" },
  ];

  const filtered =
    activeTab === "all"
      ? events
      : events.filter((e) =>
          activeTab === "published" ? e.status === "Published" : e.status === "Draft"
        );

  return (
    <ProtectedRoute>
      <div className="min-h-screen font-inter mx-auto max-w-7xl px-6 py-8 flex flex-col gap-y-8">
        <DashboardHeader />
        <StatsGrid stats={stats} />
        <Card className="p-6 rounded-2xl shadow-md bg-white">
          <h2 className="font-bold text-2xl mb-6">Event Blogs</h2>
          <input
            type="text"
            placeholder="Search events..."
            className="h-10 w-full sm:w-72 px-4 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hotpink"
          />
          <EventFilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <EventTable events={filtered} />
        </Card>
      </div>
    </ProtectedRoute>
  );
}
