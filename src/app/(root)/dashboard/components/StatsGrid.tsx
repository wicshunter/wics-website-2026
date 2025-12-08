import { Card } from "@/components/ui/card";

export default function StatsGrid({ stats }: { stats: { number: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6 rounded-2xl shadow-md bg-white">
          <p className="text-2xl font-bold text-hotpink mb-1">{stat.number}</p>
          <p className="text-gray-600 text-sm">{stat.label}</p>
        </Card>
      ))}
    </div>
  );
}
