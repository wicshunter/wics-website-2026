"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import CreateEvent from "./CreateEventModal";

export default function DashboardHeader() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
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
          onClick={() => setIsModalOpen(true)}
          className="bg-hotpink hover:bg-[#be185d] text-white"
        >
          + Create New Event
        </Button>
      </div>

      {isModalOpen && (
        <CreateEvent onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}