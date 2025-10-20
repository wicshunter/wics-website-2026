// components/EventTable.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

export default function EventTable({ events }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
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
                <td className="py-4 px-4 text-gray-700">{e.data?.date}</td>
                <td className="py-4 px-4 text-gray-700">{e.data?.category}</td>
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
                  <Button
                    aria-label="basic-button"
                    aria-controls={open ? "menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    className="bg-white p-2 rounded-md hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5 text-gray-600"
                    >
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </Button>
                  <Menu
                    id="menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                      list: {
                        "aria-labelledby": "basic-button",
                      },
                    }}
                    sx={{
                      "& .MuiMenu-paper": {
                        boxShadow: "0px 1px 5px 1px rgba(66, 68, 90, 0.05)",
                      },
                    }}
                  >
                    <MenuItem onClick={handleClose}>Edit Event</MenuItem>
                    <MenuItem onClick={handleClose}>Delete Event</MenuItem>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
