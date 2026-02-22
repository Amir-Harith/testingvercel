import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Bell, CalendarIcon, Clock } from "lucide-react";
import { Link } from "react-router";
import { calendarEvents } from "../data/mockData";

export function UpcomingReminders() {
  const now = new Date();
  
  // Get upcoming events within next 7 days
  const upcomingEvents = calendarEvents
    .filter((event) => {
      const eventDate = event.date;
      const diffTime = eventDate.getTime() - now.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      return diffDays >= 0 && diffDays <= 7;
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 3);

  const getTimeUntil = (date: Date) => {
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diffDays > 0) {
      return `In ${diffDays} day${diffDays > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `In ${diffHours} hour${diffHours > 1 ? 's' : ''}`;
    } else {
      return 'Very soon!';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "social": return "bg-blue-100 text-blue-700";
      case "medical": return "bg-red-100 text-red-700";
      case "activity": return "bg-green-100 text-green-700";
      case "family": return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  if (upcomingEvents.length === 0) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-amber-600 animate-pulse" />
          Upcoming Reminders
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className="p-4 bg-white rounded-lg border-2 border-amber-200 shadow-sm"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="font-medium text-lg mb-1">{event.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{event.description}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(event.category)}`}>
                {event.category}
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                <span>{event.date.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{event.time}</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-amber-700 font-medium">
                  ⏰ {getTimeUntil(event.date)}
                </span>
                {event.reminder && (
                  <span className="text-xs text-gray-500">
                    Reminder: {event.reminder} min before
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        <Link to="/calendar">
          <Button variant="outline" className="w-full mt-2 border-amber-300 hover:bg-amber-50">
            <CalendarIcon className="w-4 h-4 mr-2" />
            View Full Calendar
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
