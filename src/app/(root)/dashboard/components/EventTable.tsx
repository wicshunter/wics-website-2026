import { Badge } from "@/components/ui/badge";

export default function EventTable({
  events,
}: {
  events: {
    title: string;
    date: string;
    category: string;
    photos: number;
    status: string;
  }[];
}) {
  return (
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
  );
}