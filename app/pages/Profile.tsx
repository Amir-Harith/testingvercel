import { useParams, Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { MapPin, Calendar, Heart, MessageCircle, UserPlus, Edit } from "lucide-react";
import { users, currentUser, journalEntries, happyMoments } from "../data/mockData";

export function Profile() {
  const { userId } = useParams();
  const user = userId ? users.find(u => u.id === userId) : currentUser;
  const isCurrentUser = !userId || userId === currentUser.id;

  if (!user) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <p className="text-lg text-gray-600">User not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Profile Header */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-32 h-32 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl mb-2">{user.name}</h1>
                  <div className="flex flex-wrap gap-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{user.age} years old</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{user.location}</span>
                    </div>
                  </div>
                </div>
                {isCurrentUser ? (
                  <Button variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    {user.isConnected ? (
                      <Link to={`/chat/${user.id}`}>
                        <Button className="bg-amber-600 hover:bg-amber-700">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                      </Link>
                    ) : (
                      <Button className="bg-amber-600 hover:bg-amber-700">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Connect
                      </Button>
                    )}
                  </div>
                )}
              </div>

              <p className="text-lg text-gray-700 mb-4">{user.bio}</p>

              <div>
                <p className="text-sm text-gray-600 mb-2">Interests:</p>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest) => {
                    const isShared = !isCurrentUser && currentUser.interests.includes(interest);
                    return (
                      <Badge
                        key={interest}
                        variant={isShared ? "default" : "secondary"}
                        className={isShared ? "bg-amber-600" : ""}
                      >
                        {interest}
                        {isShared && " ✓"}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {isCurrentUser && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">Journal Entries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl">{journalEntries.length}</div>
                <p className="text-xs text-gray-600 mt-1">Total recordings</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">Connections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl">{users.filter(u => u.isConnected).length}</div>
                <p className="text-xs text-gray-600 mt-1">Active friends</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">Happy Moments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl">{happyMoments.length}</div>
                <p className="text-xs text-gray-600 mt-1">This month</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Journal Entries</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {journalEntries.slice(0, 3).map((entry) => (
                  <div key={entry.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={entry.thumbnail}
                      alt="Journal"
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-gray-600">
                          {entry.date.toLocaleDateString()}
                        </span>
                        <Badge 
                          variant="secondary"
                          className={`text-xs ${
                            entry.mood === 'happy' ? 'bg-green-100 text-green-700' :
                            entry.mood === 'excited' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {entry.mood}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-2">{entry.aiSummary}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500" />
                  Happy Moments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {happyMoments.slice(0, 3).map((moment) => (
                  <div key={moment.id} className="p-3 border border-rose-200 bg-rose-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs bg-rose-200 text-rose-800">
                        {moment.source}
                      </Badge>
                      <span className="text-xs text-gray-600">
                        {moment.date.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm">{moment.description}</p>
                    {moment.conversationWith && (
                      <p className="text-xs text-gray-600 mt-2">
                        With: {moment.conversationWith}
                      </p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {!isCurrentUser && (
        <Card>
          <CardHeader>
            <CardTitle>About {user.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest) => (
                    <Badge key={interest} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Location</h3>
                <p className="text-gray-700">{user.location}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Bio</h3>
                <p className="text-gray-700">{user.bio}</p>
              </div>

              {user.isConnected && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-3">
                    You're connected with {user.name.split(' ')[0]}. Send a message to start a conversation!
                  </p>
                  <Link to={`/chat/${user.id}`}>
                    <Button className="w-full bg-amber-600 hover:bg-amber-700">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
