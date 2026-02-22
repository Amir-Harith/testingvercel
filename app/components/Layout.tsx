import { Outlet, Link, useLocation } from "react-router";
import { Home, Video, Users, Brain, MessageCircle, User, Settings, Bot, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "./ui/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Video Journal", href: "/journal", icon: Video },
  { name: "Social Feed", href: "/social", icon: Users },
  { name: "Memories", href: "/memories", icon: Brain },
  { name: "AI Companion", href: "/ai-companion", icon: Bot },
  { name: "Calendar", href: "/calendar", icon: CalendarIcon },
  { name: "Connections", href: "/connections", icon: MessageCircle },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Layout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-3xl font-serif text-amber-600">The Golden Years</h1>
          <p className="text-sm text-gray-600 mt-1">Stay connected, remember together</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== "/" && location.pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-lg",
                  isActive
                    ? "bg-amber-50 text-amber-700"
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                <item.icon className="w-6 h-6" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400"
              alt="Margaret Thompson"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">Margaret Thompson</p>
              <p className="text-sm text-gray-600">Portland, OR</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}