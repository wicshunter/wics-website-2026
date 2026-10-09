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

export default function Home() {
  return (
    <div className="min-h-screen">
      
      <div className="pt-16 pb-16 px-4">
        
        <div className="container mx-auto">
          <div className="flex flex-cols-1 lg:flex-cols-2 gap-40 items-center justify-center">
            <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border-2 border-[#F4B6D2] bg-[#FCE4EF] px-6 py-3">
            <Sparkles className="h-5 w-5 text-[#D96A9C]" />
            <span className="text-base font-bold uppercase tracking-wide text-[#D96A9C]">
            Official WiCS Website
            </span>
            </div>


              <h1 className="text-5xl font-bold leading-tight">
                Where Women in Tech
                <span className="block text-pink">Shape the Future</span>
              </h1>
              <p className="text-lg text-grey max-w-2xl">
                Join a vibrant community of tech enthusiasts, innovators, and
                future leaders at Hunter College.
              </p>
             
<div className="flex items-center space-x-4">
  <a
    href="https://forms.gle/KuWM3UqUjjrPANCr7"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Button
      className="rounded-xl border-2 border-[#9372B6] bg-[#E89AAF] px-8 py-6 text-sm text-white shadow-[4px_4px_0px_#9372B6] transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:bg-[#9372B6] hover:shadow-none"
      style={{ fontFamily: "var(--font-press-start), monospace" }}
    >
      Join WiCS
      <ArrowRight className="ml-3 h-4 w-4" />
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
              
<div className="w-full overflow-hidden py-4">
  <div className="flex w-max animate-marquee">
    {[0, 1].map((copy) => (
      <div
        key={copy}
        aria-hidden={copy === 1}
        className="flex shrink-0 items-center"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className="shrink-0 px-10 text-2xl font-normal text-[#E89AAF]"
            style={{ fontFamily: "var(--font-press-start), monospace" }}
          >
            Women in Computer Science @ Hunter College ๋࣭ ⭑✮💻₊ ⊹
          </span>
        ))}
      </div>
    ))}
  </div>
</div>

              <TabsList className="bg-[#fdf2f8] text-grey">
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
              </TabsList>
            </div>
      

{/* Opportunities Section */}
<section className="mx-auto max-w-5xl px-6 py-12">

  {/* Section Heading */}
  <div className="mb-12 text-center">
    <h2 className="mb-5 text-2xl text-black">
      Opportunities
    </h2>
    <p className="text-base text-black">
      From hands-on workshops to networking and community events,
      there&apos;s always something to explore!
    </p>
  </div>

  <div className="space-y-8">

    {/* Networking: Image Left, Text Right */}
    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
    <div className="rounded-2xl border-2 border-[#B99AD6] bg-[#E5D5F2] p-3">
        <Image
          src="/images/event/photo1.png"
          alt="WiCS networking event"
          width={550}
          height={380}
          className="h-64 w-full rounded-xl object-cover"
        />
      </div>

      <div>
      <h3 className="mb-4 text-xl text-[#9372B6]">
          Networking
        </h3>
        <p className="text-base leading-7 text-black">
          Connect with fellow students, alumni, and industry
          professionals through WiCS networking opportunities!
          Build meaningful relationships, discover new career
          paths, and grow your community in tech.
        </p>
      </div>
    </div>

    {/* Community Events: Text Left, Image Right */}
    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
      <div>
      <h3 className="mb-4 text-xl text-[#7BBDE5]">
          Community Events
        </h3>
        <p className="text-base leading-7 text-black">
          Bring your creativity to life and make lasting memories
          through fun community events throughout the year!
          From cookie decorating and tote bag painting to hackathons
          and keychain making, there&apos; always something exciting
          to try, new friendships to build, and memories to create
          together!
        </p>
      </div>
      <div className="rounded-2xl border-2 border-[#8EC9E8] bg-[#B8DDF2] p-3">
        <Image
          src="/images/event/photo3.png"
          alt="WiCS community event"
          width={550}
          height={380}
          className="h-64 w-full rounded-xl object-cover"
        />
      </div>
    </div>

    {/* Workshops: Image Left, Text Right */}
    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
    <div className="rounded-2xl border-2 border-[#F4B6D2] bg-[#FCE4EF] p-3">
        <Image
          src="/images/event/photo2.jpg"
          alt="WiCS workshop"
          width={550}
          height={380}
          className="h-64 w-full rounded-xl object-cover"
        />
      </div>

      <div>
      <h3 className="mb-4 text-xl text-[#E89AAF]">
          Workshops
        </h3>
        <p className="text-base leading-7 text-black">
          Explore the world of tech, build new skills, and learn
          alongside fellow WiCS members! Join beginner-friendly
          coding workshops covering HTML and CSS, and gain valuable
          insights from students and alumni through career panels.
          Whether you&apos;re a complete beginner
          up your skills, there&apos; something for everyone.
        </p>
      </div>
    </div>

  </div>
</section>

         
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

    
      <div className="pb-8 px-4">
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
