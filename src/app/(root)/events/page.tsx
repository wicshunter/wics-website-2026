"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { db } from "../../../firebase.js";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
export const dynamic = "force-dynamic";

interface EventType {
  id: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  coverImage: string;
  gallery: string[];
  status: string;
}

export default function Events() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [seeMore, setSeeMore] = useState(false);

  useEffect(() => {
    const fetchDocuments = async () => {
      const eventsRef = collection(db, "events");
      const q = query(eventsRef, orderBy("date", "desc")); 
      const querySnapshot = await getDocs(q);

      const docs: EventType[] = querySnapshot.docs.map((doc) => {
        const data = doc.data() as Omit<EventType, "id">;
        return { id: doc.id, ...data };
      });

      setEvents(docs);
    };

    fetchDocuments();
  }, []);

  const handleSeeMore = () => {
    if (seeMore === true) {
      setSeeMore(false);
    }
    else {
      setSeeMore(true);
    }
  }

  function formatTime(time: string) {
    if (!time) return "";

    const [hour, minute] = time.split(":").map(Number);
    const isPM = hour >= 12;
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${isPM ? "PM" : "AM"}`;
  }

  console.log(events);

  return (
    <div className="font-inter space-y-16 bg-gradient-to-r from-[#fdf2f8] via-white to-[#fdf2f8]">
      <div className="relative group transition-transform duration-500 hover:rotate-0 ml-[10%] mr-[10%] mt-[5%]">
        <div className="absolute inset-0 rotate-3 rounded-2xl bg-bannerGradient transition-transform duration-300 group-hover:rotate-0"></div>
        <div className="bg-white flex flex-col gap-5 rounded-2xl p-10 pb-[5%] -rotate-1 transition-transform duration-300 group-hover:rotate-0">
          <h1 className="font-bold text-4xl">Upcoming Events</h1>
          <p className="text-lg">
            Join us for exciting workshops, talks, and networking opportunities!
          </p>
          <Button className="self-start w-fit">Submit an Event Idea</Button>
        </div>
      </div>

      <div className="font-bold space-y-6 ml-[10%] mr-[10%]">
        <h1 className="text-2xl">Upcoming Event</h1>
        <Card className="space-y-3 border-none">
          <CardHeader className="p-0">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
              <Image
                src={events?.[0]?.coverImage || "https://th.bing.com/th/id/OIP.2N3yUqpMYG6VHxj1maGVpAHaEo?rs=1&pid=ImgDetMain"}
                alt="External Image"
                fill
                unoptimized
                className="object-contain"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-hotpink font-medium text-sm">Workshop</p>
              <h2 className="text-xl">{ events?.[0]?.name || "Web Development Fundamentals"}</h2>
            </div>
            <div className="flex flex-col gap-2 text-sm font-medium text-lightg">
              <div className="flex items-center gap-2">
                <Calendar strokeWidth={3} className="h-4 w-4 font-lg" />
                <span>{events?.[0]?.date || "March 15, 2025"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock strokeWidth={3} className="h-4 w-4" />
                <span>{(formatTime(events?.[0]?.startTime) + (events?.[0]?.endTime && ` - ${formatTime(events?.[0]?.endTime)}`)) || "2:00 PM - 4:00 PM"}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin strokeWidth={3} className="h-4 w-4" />
                <span>{events?.[0]?.location || "W605"}</span>
              </div>
            </div>
            <p className="text-sm font-medium text-lightg">
              {events?.[0]?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua."}
            </p>
          </CardContent>
          <CardFooter>
            <Button className="self-start w-full">Register Now</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="space-y-6 ml-[10%] mr-[10%]">
        <h1 className="font-bold text-2xl">Past Event Highlights</h1>
        <div className="grid grid-cols-3 gap-10">
          {events &&
            !seeMore ?
            (events?.slice(0, 3).map((post) => (
              <Card
                key={post?.id}
                className="bg-white/50 drop-shadow-[0px_0px_10.4px_#db277780] border-none p-0 rounded-xl flex flex-col justify-between"
              >
                <CardHeader className="p-4">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl shadow-[0px_0px_10px_#db277760]">
                    <Image
                      src={post?.coverImage || ""}
                      alt="External Image"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="font-bold">{post?.name}</p>
                  <div className="markdown-content">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {post?.description?.slice(0, 100) + "" || ""}
                    </ReactMarkdown>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/events/${post?.id}`}
                    className="bg-white font-semibold rounded-lg w-full border border-1 p-2 text-center"
                  >
                    <button className="">View Recap</button>
                  </Link>
                </CardFooter>
              </Card>
            )))
            :
            (events?.map((post) => (
              <Card
                key={post?.id}
                className="bg-white/50 drop-shadow-[0px_0px_10.4px_#db277780] border-none p-0 rounded-xl"
              >
                <CardHeader className="p-4">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl shadow-[0px_0px_10px_#db277760]">
                    <Image
                      src={post?.coverImage || ""}
                      alt="External Image"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="font-bold">{post?.name}</p>
                  <div className="markdown-content">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {post?.description?.slice(0, 50) || ""}
                    </ReactMarkdown>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/events/${post?.id}`}
                    className="bg-white font-semibold rounded-lg w-full border border-1 p-2 text-center"
                  >
                    <button>View Recap</button>
                  </Link>
                </CardFooter>
              </Card>
            )))
          }
        </div>
        <div className="flex flex-col items-center">
          <button className="bg-buttonGradient font-semibold rounded-lg p-2 pl-5 pr-5 text-grey mt-[2%]"
            onClick={handleSeeMore}
          >
            {!seeMore ? "See More": "See Less"}
          </button>
        </div>
      </div>

      <div className="bg-cardGradient rounded-2xl p-10 border border-1 ml-[10%] mr-[10%]">
        <div className="flex flex-col gap-4 items-center text-center space-y-4">
          <h1 className="font-bold text-2xl">Want to Host an Event?</h1>
          <p className="font-medium text-grey">
            Have an idea for a workshop, tech talk, or any other event? We'd
            love to hear from you!
          </p>
          <a href="mailto:hunterwics@gmail.com">
            <Button>Contact Us</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
