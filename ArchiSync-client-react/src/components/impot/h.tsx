// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Clock, FileText, Plus, Users } from "lucide-react"
// import { ProjectCard } from "@/components/project-card"
// import { RecentActivity } from "@/components/recent-activity"
// import { TeamMembers } from "@/components/team-members"
// import { UpcomingDeadlines } from "@/components/upcoming-deadlines"
// import { RecentMessages } from "@/components/recent-messages"
// import { AIAssistant } from "@/components/ai-assistant"

// export default function Home() {
//   return (
//     <div className="flex flex-col gap-8">
//       <div className="flex flex-col gap-2">
//         <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
//         <p className="text-muted-foreground">
//           Welcome back to ArchiSync. Here's an overview of your projects and activities.
//         </p>
//       </div>

//       <div className="flex flex-col gap-4 md:flex-row">
//         <div className="w-full md:w-2/3">
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//             <Card className="border-border bg-card">
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
//                 <FileText className="h-4 w-4 text-amber-400" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">12</div>
//                 <p className="text-xs text-muted-foreground">+2 from last month</p>
//               </CardContent>
//             </Card>
//             <Card className="border-border bg-card">
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Team Members</CardTitle>
//                 <Users className="h-4 w-4 text-amber-400" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">24</div>
//                 <p className="text-xs text-muted-foreground">+4 new this month</p>
//               </CardContent>
//             </Card>
//             <Card className="border-border bg-card">
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Hours Logged</CardTitle>
//                 <Clock className="h-4 w-4 text-amber-400" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">243</div>
//                 <p className="text-xs text-muted-foreground">+18% from last week</p>
//               </CardContent>
//             </Card>
//           </div>

//           <div className="mt-6">
//             <div className="mb-4 flex items-center justify-between">
//               <h2 className="text-xl font-semibold">Recent Projects</h2>
//               <Button
//                 variant="outline"
//                 className="border-amber-400 text-amber-400 hover:bg-secondary hover:text-amber-400"
//               >
//                 <Plus className="mr-2 h-4 w-4" /> Add Project
//               </Button>
//             </div>
//             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//               <ProjectCard
//                 title="Urban Renewal Center"
//                 image="/placeholder.svg?height=180&width=320&text=Urban+Renewal"
//                 client="City of Metropolis"
//                 progress={75}
//                 dueDate="Jun 15, 2025"
//                 status="In Progress"
//               />
//               <ProjectCard
//                 title="Riverside Apartments"
//                 image="/placeholder.svg?height=180&width=320&text=Riverside"
//                 client="Riverfront Development Co."
//                 progress={45}
//                 dueDate="Aug 22, 2025"
//                 status="In Progress"
//               />
//               <ProjectCard
//                 title="Tech Campus Expansion"
//                 image="/placeholder.svg?height=180&width=320&text=Tech+Campus"
//                 client="TechGiant Inc."
//                 progress={90}
//                 dueDate="May 30, 2025"
//                 status="Review"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="w-full md:w-1/3">
//           <Card className="border-border bg-card">
//             <CardHeader>
//               <CardTitle>Recent Messages</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <RecentMessages />
//             </CardContent>
//           </Card>

//           <Card className="mt-6 border-border bg-card">
//             <CardHeader>
//               <CardTitle>AI Assistant</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <AIAssistant />
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       <div className="mt-4">
//         <Tabs defaultValue="activity" className="space-y-4">
//           <TabsList className="bg-secondary">
//             <TabsTrigger value="activity" className="data-[state=active]:bg-amber-400 data-[state=active]:text-black">
//               Recent Activity
//             </TabsTrigger>
//             <TabsTrigger value="team" className="data-[state=active]:bg-amber-400 data-[state=active]:text-black">
//               Team
//             </TabsTrigger>
//             <TabsTrigger value="deadlines" className="data-[state=active]:bg-amber-400 data-[state=active]:text-black">
//               Deadlines
//             </TabsTrigger>
//           </TabsList>
//           <TabsContent value="activity">
//             <RecentActivity />
//           </TabsContent>
//           <TabsContent value="team">
//             <TeamMembers />
//           </TabsContent>
//           <TabsContent value="deadlines">
//             <UpcomingDeadlines />
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   )
// }
