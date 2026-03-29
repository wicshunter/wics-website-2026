"use client";

import { useEffect, useState } from "react";
import { addDoc, collection, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";

type EventItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
  imagePublicId?: string;
};

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [events, setEvents] = useState<EventItem[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "events"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const rows: EventItem[] = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<EventItem, "id">),
      }));
      setEvents(rows);
    } catch {
      setMessage("Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setSubmitting(true);

    try {
      let imageUrl = "";
      let imagePublicId = "";

      if (imageFile) {
        const fd = new FormData();
        fd.append("file", imageFile);

        const uploadRes = await fetch("/api/cloudinary/upload", {
          method: "POST",
          body: fd,
        });

        const uploadJson = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadJson.error || "Image upload failed");

        imageUrl = uploadJson.url;
        imagePublicId = uploadJson.publicId;
      }

      await addDoc(collection(db, "events"), {
        title,
        description,
        date,
        imageUrl,
        imagePublicId,
        createdAt: serverTimestamp(),
      });

      setTitle("");
      setDescription("");
      setDate("");
      setImageFile(null);
      setMessage("Event created.");
      fetchEvents();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to create event.";
      setMessage(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Admin Dashboard</h1>

      <form onSubmit={handleSubmit} className="mb-8 space-y-3 rounded border p-4">
        <input
          className="w-full rounded border p-2"
          placeholder="Event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full rounded border p-2"
          placeholder="Event description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
        />
        <input
          type="date"
          className="w-full rounded border p-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          className="w-full rounded border p-2"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-black px-4 py-2 text-white disabled:opacity-60"
        >
          {submitting ? "Creating..." : "Create Event"}
        </button>
      </form>

      {message ? <p className="mb-4 text-sm">{message}</p> : null}

      <h2 className="mb-3 text-xl font-semibold">Saved Events</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {events.map((event) => (
            <article key={event.id} className="rounded border p-3">
              {event.imageUrl ? (
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="mb-2 h-44 w-full rounded object-cover"
                />
              ) : null}
              <h3 className="font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.date}</p>
              <p className="mt-1 text-sm">{event.description}</p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}