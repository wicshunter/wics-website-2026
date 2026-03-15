export default function EventFilterTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: "all" | "published" | "drafts";
  setActiveTab: (tab: "all" | "published" | "drafts") => void;
}) {
  const tabs = [
    { key: "all", label: "All Events" },
    { key: "published", label: "Published" },
    { key: "drafts", label: "Drafts" },
  ] as const;

  return (
    <div className="flex gap-1 p-1 bg-gray-100 rounded-lg w-fit mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`px-6 py-1 rounded-md transition-colors text-sm ${
            activeTab === tab.key
              ? "bg-white text-hotpink font-semibold shadow-sm"
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
