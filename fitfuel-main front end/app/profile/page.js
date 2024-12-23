import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/ui/navbar";
import { Bell } from "lucide-react";

export default function Profile() {
    return (
        <div className="min-h-screen flex flex-col max-w-screen overflow-hidden">
            {/* Navigation */}
            <Navbar />

            {/* User Header */}
            <header className="bg-green-400 p-4">
              <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <h1 className="text-xl font-semibold text-white">Hello, User!</h1>
                </div>
                <button className="text-white">
                  <Bell size={24} />
                </button>
              </div>
            </header>
        </div>
    )
}