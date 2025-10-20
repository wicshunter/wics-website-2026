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
import { getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function Events() {
  const [events, setEvents] = useState([{}]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const querySnapshot = await getDocs(collection(db, "events"));
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setEvents(docs);
    };

    fetchDocuments();
  }, []);
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
                src="https://th.bing.com/th/id/OIP.2N3yUqpMYG6VHxj1maGVpAHaEo?rs=1&pid=ImgDetMain"
                alt="External Image"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-hotpink font-medium text-sm">Workshop</p>
              <h2 className="text-xl">Web Development Fundamentals</h2>
            </div>
            <div className="flex flex-col gap-2 text-sm font-medium text-lightg">
              <div className="flex items-center gap-2">
                <Calendar strokeWidth={3} className="h-4 w-4 font-lg" />
                <span>March 15, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock strokeWidth={3} className="h-4 w-4" />
                <span>2:00 PM - 4:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin strokeWidth={3} className="h-4 w-4" />
                <span>W605</span>
              </div>
            </div>
            <p className="text-sm font-medium text-lightg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
            events?.slice(0, 3).map((post) => (
              <Card
                key={post?.id}
                className="bg-white/50 drop-shadow-[0px_0px_10.4px_#db277780] border-none p-0 rounded-xl"
              >
                <CardHeader className="p-4">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl shadow-[0px_0px_10px_#db277760]">
                    <Image
                      src={post?.coverImage}
                      alt="External Image"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="font-bold">{post?.name}</p>
                  <p className="text-sm text-500 text-lightg">
                    <p
                      className="event-description"
                      dangerouslySetInnerHTML={{
                        __html: post?.description || "",
                      }}
                    />
                  </p>
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
            ))}
        </div>
        <div className="flex flex-col items-center">
          <button className="bg-buttonGradient font-semibold rounded-lg p-2 pl-5 pr-5 text-grey mt-[2%]">
            See More
          </button>
        </div>
      </div>

      <div className="bg-cardGradient rounded-2xl p-10 border border-1 ml-[10%] mr-[10%]">
        <div className="flex flex-col gap-4 items-center text-center space-y-4">
          <h1 className="font-bold text-2xl">Want to Host an Event?</h1>
          <p className="font-medium text-grey">
            Have an idea for a workshop, tech talk, or any other event? We’d
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
