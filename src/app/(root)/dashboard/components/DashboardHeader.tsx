import { Button } from "@/components/ui/button";

export default function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-bold text-[2rem] md:text-[2.4rem]">Admin Dashboard</h1>
        <p className="text-gray-600">Manage event blogs, highlights, and photos</p>
      </div>
      <Button className="bg-hotpink hover:bg-[#be185d] text-white">
        + Create New Event
      </Button>
    </div>
  );
}
