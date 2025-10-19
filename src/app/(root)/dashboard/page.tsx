"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Plus, MoreVertical } from "lucide-react";
import ProtectedRoute from "../../../components/ProtectedRoutes";

// Sample data for event blogs
const eventBlogs = [
  {
    id: 1,
    title: "Web Development Workshop",
    date: "Mar 15, 2024",
    category: "Workshop",
    photos: 24,
    status: "Published",
  },
  {
    id: 2,
    title: "Tech Career Fair 2024",
    date: "Mar 10, 2024",
    category: "Career",
    photos: 45,
    status: "Published",
  },
  {
    id: 3,
    title: "AI/ML Study Session",
    date: "Mar 8, 2024",
    category: "Study Group",
    photos: 12,
    status: "Draft",
  },
  {
    id: 4,
    title: "Hackathon Prep Meeting",
    date: "Mar 5, 2024",
    category: "Meeting",
    photos: 8,
    status: "Draft",
  },
  {
    id: 5,
    title: "Women in Tech Panel",
    date: "Feb 28, 2024",
    category: "Panel",
    photos: 35,
    status: "Published",
  },
];

export default function AdminDashboard() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage event blogs, highlights, and photos</p>
            </div>
            <Button className="bg-[#E91E63] hover:bg-[#C2185B] text-white flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create New Event
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white rounded-2xl shadow-md border-0">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-[#E91E63] mb-2">15</div>
                <div className="text-sm text-gray-500">Total Events</div>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-2xl shadow-md border-0">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-[#E91E63] mb-2">8</div>
                <div className="text-sm text-gray-500">Published</div>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-2xl shadow-md border-0">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-[#E91E63] mb-2">6</div>
                <div className="text-sm text-gray-500">Drafts</div>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-2xl shadow-md border-0">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-[#E91E63] mb-2">142</div>
                <div className="text-sm text-gray-500">Total Photos</div>
              </CardContent>
            </Card>
          </div>

          {/* Event Blogs Table */}
          <Card className="bg-white rounded-2xl shadow-md border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold">Event Blogs</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <TabsList className="bg-gray-100">
                    <TabsTrigger value="all">All Events</TabsTrigger>
                    <TabsTrigger value="published">Published</TabsTrigger>
                    <TabsTrigger value="drafts">Drafts</TabsTrigger>
                  </TabsList>
                  
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input 
                      placeholder="Search events..." 
                      className="pl-10 bg-gray-50 border-gray-200"
                    />
                  </div>
                </div>

                <TabsContent value="all" className="mt-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Event Title</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Category</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Photos</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {eventBlogs.map((event) => (
                          <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm text-gray-900">{event.title}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{event.date}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{event.category}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{event.photos}</td>
                            <td className="py-3 px-4">
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                event.status === "Published" 
                                  ? "bg-green-100 text-green-700" 
                                  : "bg-yellow-100 text-yellow-700"
                              }`}>
                                {event.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <button className="text-gray-400 hover:text-gray-600">
                                <MoreVertical className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="published" className="mt-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Event Title</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Category</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Photos</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {eventBlogs.filter(e => e.status === "Published").map((event) => (
                          <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm text-gray-900">{event.title}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{event.date}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{event.category}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{event.photos}</td>
                            <td className="py-3 px-4">
                              <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                                {event.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <button className="text-gray-400 hover:text-gray-600">
                                <MoreVertical className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="drafts" className="mt-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Event Title</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Category</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Photos</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {eventBlogs.filter(e => e.status === "Draft").map((event) => (
                          <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm text-gray-900">{event.title}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{event.date}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{event.category}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{event.photos}</td>
                            <td className="py-3 px-4">
                              <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
                                {event.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <button className="text-gray-400 hover:text-gray-600">
                                <MoreVertical className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
