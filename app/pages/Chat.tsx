import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Send, Phone, Video, Heart, ArrowLeft, Sparkles } from "lucide-react";
import { users, messages, currentUser } from "../data/mockData";
import { Badge } from "../components/ui/badge";

export function Chat() {
  const { userId } = useParams();
  const [messageText, setMessageText] = useState("");
  const [chatMessages, setChatMessages] = useState(userId ? messages[userId] || [] : []);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const otherUser = users.find(u => u.id === userId);
  const connectedUsers = users.filter(u => u.isConnected);

  useEffect(() => {
    if (userId && messages[userId]) {
      setChatMessages(messages[userId]);
    }
  }, [userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSend = () => {
    if (messageText.trim() && userId) {
      const newMessage = {
        id: `msg-${Date.now()}`,
        senderId: currentUser.id,
        receiverId: userId,
        content: messageText,
        timestamp: new Date(),
      };
      setChatMessages([...chatMessages, newMessage]);
      setMessageText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!userId || !otherUser) {
    return (
      <div className="p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Messages</h1>
          <p className="text-xl text-gray-600">Stay in touch with your connections</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connectedUsers.map((user) => (
            <Link key={user.id} to={`/chat/${user.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-lg mb-1">{user.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{user.location}</p>
                      {messages[user.id] && messages[user.id].length > 0 && (
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {messages[user.id][messages[user.id].length - 1].content}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              AI Happy Moments Detection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 mb-4">
              Our AI listens to your conversations and automatically detects when you're expressing happiness or joy. 
              These special moments are saved to help you remember the good times.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm mb-1">What we detect:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Expressions of joy and excitement</li>
                    <li>• Laughter and positive emotions</li>
                    <li>• Sharing good news</li>
                    <li>• Warm exchanges with friends</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/chat">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <Link to={`/profile/${otherUser.id}`} className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={otherUser.avatar}
                  alt={otherUser.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h2 className="text-xl font-medium">{otherUser.name}</h2>
                <p className="text-sm text-gray-600">Active now</p>
              </div>
            </Link>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Video className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {chatMessages.map((message) => {
            const isCurrentUser = message.senderId === currentUser.id;
            const sender = isCurrentUser ? currentUser : otherUser;

            return (
              <div
                key={message.id}
                className={`flex gap-3 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <img
                  src={sender.avatar}
                  alt={sender.name}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'} max-w-md`}>
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      isCurrentUser
                        ? 'bg-amber-600 text-white'
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    <p className="text-base">{message.content}</p>
                    {message.isHappyMoment && (
                      <div className={`flex items-center gap-1 mt-2 pt-2 border-t ${
                        isCurrentUser ? 'border-amber-700' : 'border-gray-200'
                      }`}>
                        <Heart className={`w-4 h-4 ${isCurrentUser ? 'text-amber-200' : 'text-rose-500'}`} />
                        <span className={`text-xs ${isCurrentUser ? 'text-amber-200' : 'text-gray-600'}`}>
                          Happy moment detected
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 mt-1 px-2">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex gap-3">
          <Input
            placeholder={`Message ${otherUser.name}...`}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 text-lg"
          />
          <Button
            onClick={handleSend}
            disabled={!messageText.trim()}
            size="lg"
            className="bg-amber-600 hover:bg-amber-700"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
