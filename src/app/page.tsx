"use client";
import Image from "next/image";
import { MoveUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Instagram, Users, Github, Linkedin } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { db } from "@/firebase"; // Double check if it's "@/src/firebase" based on your folder
import { collection, getDocs } from "firebase/firestore";


export default function Home() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, "events"));
      const eventsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEvents(eventsList);
    };
    fetchEvents();
  }, []);
  
  return (
    <div className="min-h-screen">
      <div className="pt-16 pb-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-cols-1 lg:flex-cols-2 gap-40 items-center justify-center">
            <div className="space-y-6">
              <div className="inline-block">
                <div className="flex items-center space-x-2 bg-[#fce7f3] rounded-full px-4 py-1">
                  <Sparkles className="w-4 h-4 text-hotpink" />
                  <span className="text-sm text-hotpink font-semibold">
                    Hunter College WiCS
                  </span>
                </div>
              </div>
              <h1 className="text-5xl font-bold leading-tight">
                Where Women in Tech
                <span className="block text-hotpink">Shape the Future</span>
              </h1>
              <p className="text-lg text-grey max-w-2xl">
                Join a vibrant community of tech enthusiasts, innovators, and
                future leaders at Hunter College.
              </p>
              <div className="flex items-center space-x-4">
                <a href="https://forms.gle/KuWM3UqUjjrPANCr7" target="_blank">
                  <Button className="bg-hotpink hover:bg-[#be185d] px-6">
                    Join WiCS
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FBCEEC] to-[#fdf2f8] rounded-2xl transform rotate-3 " />
              <Image
                src="/images/event/cookie-decorating-team.jpg"
                alt="team"
                width={700}
                height={500}
                className="relative rounded-2xl transform -rotate-3 transition-transform hover:rotate-0"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-4">
        <div className="container mx-auto">
          <Tabs defaultValue="events" className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold">Discover WiCS</h2>
              <TabsList className="bg-[#fdf2f8] text-grey">
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="events" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event, i) => (
                
                  <Card
                    key={i}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-0">
                      <div className="aspect-video bg-pink-100 relative">
                        <Calendar className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-pink-600" />
                      </div>
                      <div className="p-6">
                        <div className="text-sm text-pink-600 mb-2">
                          {event.date}
                        </div>
                        <h3 className="font-bold mb-2">
                          {event.name}
                          
                          
                        </h3>
                        <p className="text-sm text-gray-600">
                          {event.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="community" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">
                        Join Our Community
                      </h3>
                      <p className="text-grey mb-6">
                        Connect with fellow students, mentors, and industry
                        professionals. Share knowledge, find support, and grow
                        together.
                      </p>
                      <div className="flex space-x-4">
                        <Button variant="outline" className="space-x-2">
                          <FontAwesomeIcon
                            icon={faDiscord}
                            className="hover:scale-150 hover:text-hotpink w-6 h-6 duration-1000 ease-in-out"
                          />
                          <span>Discord</span>
                        </Button>
                        <Button variant="outline" className="space-x-2">
                          <Github className="w-4 h-4" />
                          <span>GitHub</span>
                        </Button>
                        <Button variant="outline" className="space-x-2">
                          <Linkedin className="w-4 h-4" />
                          <span>LinkedIn</span>
                        </Button>
                        <Button variant="outline" className="space-x-2">
                          <Instagram className="w-4 h-4" />
                          <span>Instagram</span>
                        </Button>
                      </div>
                    </div>
                    <div className="relative">
                      <Users className="w-32 h-32 text-hotpink mx-auto" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Active Members", value: "150+" },
              { label: "Events per Semester", value: "3+" },
              { label: "Industry Partners", value: "2+" },
              { label: "Project Collaborations", value: "4+" },
            ].map((stat, i) => (
              <div key={i} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#ec4899] to-hotpink rounded-lg blur-lg opacity-25 group-hover:opacity-40 transition-opacity" />
                <Card className="relative bg-white/50 backdrop-blur-sm border-0">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-hotpink mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-grey">{stat.label}</div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pb-20 px-4">
        <div className="container mx-auto">
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#fce7f3] to-[#fdf2f8]"></div>
            <CardContent className="relative p-8 md:p-12">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
                <p className="text-black mb-8">
                  Get updates about events, workshops, and opportunities
                  directly in your inbox.
                </p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <Button className="bg-hotpink hover:bg-[#be185d]">
                    Subscribe
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
