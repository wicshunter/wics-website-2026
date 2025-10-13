import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Laptop, Book, Users, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Resources() {
    return (
        <div className="font-inter min-h-screen space-y-16 mb-[15%] mt-[1%] bg-gradient-to-r from-[#fdf2f8] via-white to-[#fdf2f8]">
            <div className="flex flex-col gap-4 items-center justify-center pt-10 ml-[25%] mr-[25%] text-center">
                <h1 className="text-4xl font-bold">Resources</h1>
                <p className="text-grey text-lg">
                    Explore our curated collection of resources to support your
                    journey in computer science and technology.
                </p>
            </div>

            <div className="ml-[10%] mr-[10%]">
                <Tabs defaultValue="career" className="">
                    <TabsList className="w-full bg-pink/25">
                        <TabsTrigger value="career">Career</TabsTrigger>
                        <TabsTrigger value="learning">Learning</TabsTrigger>
                    </TabsList>
                    <TabsContent value="learning">
                        <div className="grid grid-cols-2 grid-rows-2 gap-4 font-inter pt-8">
                            <Card>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-4 pt-5 justify-start font-semibold">
                                            <Code
                                                strokeWidth={2}
                                                className="bg-[#FCE7F3] text-[#DB2777] rounded-full p-1.5 h-10 w-10"
                                            />
                                            <span className="text-xl">
                                                Introduction to Programming
                                            </span>
                                        </div>
                                        <div>
                                            <a className="text-[#EC4899] text-sm font-semibold">
                                                Learn More
                                            </a>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-4 pt-5 justify-start font-semibold">
                                            <Laptop
                                                strokeWidth={2}
                                                className="bg-[#FCE7F3] text-[#DB2777] rounded-full p-1.5 h-10 w-10"
                                            />
                                            <span className="text-xl">
                                                Web Development Fundamentals
                                            </span>
                                        </div>
                                        <div>
                                            <a className="text-[#EC4899] text-sm font-semibold">
                                                Learn More
                                            </a>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-4 pt-5 justify-start font-semibold">
                                            <Book
                                                strokeWidth={2}
                                                className="bg-[#FCE7F3] text-[#DB2777] rounded-full p-1.5 h-10 w-10"
                                            />
                                            <span className="text-xl">
                                                Data Structures and Algorithms
                                            </span>
                                        </div>
                                        <div>
                                            <a className="text-[#EC4899] text-sm font-semibold">
                                                Learn More
                                            </a>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-4 pt-5 justify-start font-semibold">
                                            <Book
                                                strokeWidth={2}
                                                className="bg-[#FCE7F3] text-[#DB2777] rounded-full p-1.5 h-10 w-10"
                                            />
                                            <span className="text-xl">
                                                Machine Learning Basics
                                            </span>
                                        </div>
                                        <div>
                                            <a className="text-[#EC4899] text-sm font-semibold">
                                                Learn More
                                            </a>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                    <TabsContent value="career">
                        <div className="grid grid-cols-2 grid-rows-2 gap-4 font-inter pt-8">
                            <Card>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-4 pt-5 justify-start font-semibold">
                                            <Book
                                                strokeWidth={2}
                                                className="bg-[#FCE7F3] text-[#DB2777] rounded-full p-1.5 h-10 w-10"
                                            />
                                            <span className="text-xl">
                                                Resume Writing Guide
                                            </span>
                                        </div>
                                        <div>
                                            <a className="text-[#EC4899] text-sm font-semibold">
                                                Learn More
                                            </a>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-4 pt-5 justify-start font-semibold">
                                            <Users
                                                strokeWidth={2}
                                                className="bg-[#FCE7F3] text-[#DB2777] rounded-full p-1.5 h-10 w-10"
                                            />
                                            <span className="text-xl">
                                                Interview Preparation
                                            </span>
                                        </div>
                                        <div>
                                            <a className="text-[#EC4899] text-sm font-semibold">
                                                Learn More
                                            </a>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-4 pt-5 justify-start font-semibold">
                                            <Laptop
                                                strokeWidth={2}
                                                className="bg-[#FCE7F3] text-[#DB2777] rounded-full p-1.5 h-10 w-10"
                                            />
                                            <span className="text-xl">
                                                Internship Opportunities
                                            </span>
                                        </div>
                                        <div>
                                            <a className="text-[#EC4899] text-sm font-semibold">
                                                Learn More
                                            </a>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-4 pt-5 justify-start font-semibold">
                                            <Link
                                                strokeWidth={2}
                                                className="bg-[#FCE7F3] text-[#DB2777] rounded-full p-1.5 h-10 w-10"
                                            />
                                            <span className="text-xl">
                                                Tech Industry Insights
                                            </span>
                                        </div>
                                        <div>
                                            <a className="text-[#EC4899] text-sm font-semibold">
                                                Learn More
                                            </a>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            <Card className="bg-cardGradient p-10 rounded-lg grid grid-cols-2 gap-x-16 ml-[10%] mr-[10%] border border-[#E5E7EB]">
                <CardHeader className="flex justify-center space-y-3">
                    <h1 className="font-bold text-2xl">
                        Featured: Coding Workshop Series
                    </h1>
                    <p className="text-grey">
                        Join our coding workshops where you’ll learn in-demand
                        skills from industry professionals. Perfect for
                        beginners and intermediate coders alike!
                    </p>
                    <Button className="w-fit hover:bg-hotpink hover:text-white hover:animate-scale-up-center">
                        View Workshop Schedule
                    </Button>
                </CardHeader>
                <CardContent>
                    <Image
                        src="https://th.bing.com/th/id/OIP.2N3yUqpMYG6VHxj1maGVpAHaEo?rs=1&pid=ImgDetMain"
                        alt="External Image"
                        unoptimized
                        width={100}
                        height={200}
                        className="w-full h-[25vh] rounded-2xl"
                    />
                </CardContent>
            </Card>

            <div className="ml-[10%] mr-[10%] space-y-10">
                <h1 className="font-bold text-2xl text-center">
                    External Resources
                </h1>
                <div className="grid grid-cols-3 gap-x-6">
                    <Card className="space-y-0 pb-0">
                        <CardHeader>
                            <p className="font-semibold text-lg">
                                Girls Who Code
                            </p>
                            <a className="text-hotpink text-sm">
                                Visit Website
                            </a>
                        </CardHeader>
                    </Card>
                    <Card className="space-y-0 pb-0">
                        <CardHeader>
                            <p className="font-semibold text-lg">Codeacademy</p>
                            <a className="text-hotpink text-sm">
                                Visit Website
                            </a>
                        </CardHeader>
                    </Card>
                    <Card className="space-y-0 pb-0">
                        <CardHeader>
                            <p className="font-semibold text-lg">Wecode</p>
                            <a className="text-hotpink text-sm">
                                Visit Website
                            </a>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </div>
    );
}
