import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OfficerCard from "./card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  faculty,
  eboard,
  communityOfficer,
  graphicDesigner,
  socialMediaManager,
  webMaster,
  workshop,
} from "./data";

/**
 * Officers Component
 *
 * Renders a page with team section with a header, a contact card, and tabs for different groups
 * (faculty, executive board, team members, web masters, workshop coordinators).
 * Each tab displays a grid of OfficerCards with their name, role, major, image, and social/contact links.
 *
 * @constant {Array} TABS - Array of tab objects, each containing:
 *   @property {string} value - Internal value used by Tabs component.
 *   @property {string} label - Label displayed on the tab.
 *   @property {Array} data - Array of officer objects for the tab.
 *
 * Dependencies:
 * - OfficerCard component for individual member display
 * - Tabs, TabsContent, TabsList, TabsTrigger from '@/components/ui/tabs'
 * - Card, CardContent from '@/components/ui/card'
 * - Button from '@/components/ui/button'
 *
 * Author: Vincent Zhong
 * Date: 2025-08-30
 */

const TABS = [
  { value: "faculty", label: "Faculty Advisors", data: faculty },
  { value: "eboard", label: "Executive Board", data: eboard },
  {
    value: "socialMedia",
    label: "Social Media Managers",
    data: socialMediaManager,
  },
  {
    value: "graphicDesigner",
    label: "Graphic Designers",
    data: graphicDesigner,
  },
  { value: "web", label: "Web Masters", data: webMaster },
  { value: "workshop", label: "Workshop Coordinators", data: workshop },
  {
    value: "communityOfficer",
    label: "Community Officers",
    data: communityOfficer,
  },
];

export default function Officers() {
  const renderTabContent = (data: typeof faculty) => (
    <div className="container mx-auto w-4/5 h-auto p-7 pt-20 sm:p-10 rounded-lg flex flex-wrap items-center justify-around">
      {data.map((item, index) => (
        <OfficerCard
          key={index}
          title={item.title}
          description={item.description}
          imageUrl={item.imageUrl}
          major={item.major}
          linkedin={item.linkedin}
          github={item.github}
          email={item.email}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="container mx-auto w-4/5 h-[40%] p-7 pt-20 sm:p-10 rounded-lg flex flex-row justify-between items-center">
        <div className="w-[50%] h-40 flex flex-col justify-around">
          <h1 className="text-black text-5xl font-bold">Meet Our Team</h1>
          <p className="text-[#4B5563] text-lg font-light">
            The dedicated individuals working to empower and promote women in
            technology at Hunter College.
          </p>
        </div>

        <div className="relative flex flex-col w-[45%] h-60 text-left items-left justify-center rounded-lg p-10">
          <div className="absolute z-10 left-[10%]">
            <h3 className="text-black text-lg font-bold">Contact us:</h3>
            <p className="pt-4 text-lg font-normal text-[#4B5563]">
              Reach the team:
            </p>
            <a
              href="mailto:hunterwics@gmail.com"
              className="text-[#f9679d] text-lg font-normal underline hover:text-[#f9679d]"
            >
              hunterwics@gmail.com
            </a>
          </div>

          <span className="absolute inset-9 w-[90%] h-[70%] bg-gradient-to-r from-[#ec4899] to-[#f472b6] rounded-lg blur-lg opacity-25 transition-opacity group-hover:opacity-40"></span>

          <span className="relative w-[98%] h-full bg-white/50 backdrop-blur-sm rounded-lg"></span>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="container mx-auto">
        <Tabs defaultValue="faculty" className="w-full">
          <TabsList className="flex justify-center">
            {TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {TABS.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              {renderTabContent(tab.data)}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Call to Action */}
      <div className="pb-20 px-4">
        <div className="container mx-auto">
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#fce7f3] to-[#fdf2f8]"></div>
            <CardContent className="relative p-8 md:p-12">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Want to Get Involved?
                </h2>
                <p className="text-black mb-8">
                  We&apos;re always looking for passionate individuals to join
                  our team. Reach out to learn more about leadership
                  opportunities!
                </p>
                <Button className="bg-hotpink hover:bg-[#be185d]">
                  Contact Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
