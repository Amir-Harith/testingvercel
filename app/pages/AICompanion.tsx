import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Mic, MicOff, Volume2, VolumeX, Brain, Sparkles, User, Bot, Send, MessageSquare } from "lucide-react";
import { journalEntries, memories, currentUser } from "../data/mockData";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";

type ConversationMessage = {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
  referencedMemories?: string[];
  audioUrl?: string;
};

type VoiceState = "idle" | "listening" | "processing" | "speaking";

export function AICompanion() {
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [userTranscript, setUserTranscript] = useState("");
  const [textInput, setTextInput] = useState("");
  const [activeTab, setActiveTab] = useState<"voice" | "text">("text");
  const conversationEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  // Mock AI responses based on journal content
  const generateAIResponse = (userMessage: string): ConversationMessage => {
    const lowerMessage = userMessage.toLowerCase();
    
    let response = "";
    let referencedMemories: string[] = [];

    // Check for specific topics
    if (lowerMessage.includes("garden") || lowerMessage.includes("flower") || lowerMessage.includes("plant")) {
      response = "I remember you mentioned your garden! In your journal from February 20th, you talked about planting spring bulbs and how the tulips reminded you of your mother's garden. How is your garden doing today?";
      referencedMemories = ["memory-1"];
    } else if (lowerMessage.includes("grandson") || lowerMessage.includes("tommy") || lowerMessage.includes("family")) {
      response = "Yes! I recall from your journal on February 18th that your grandson Tommy got accepted to college. You were so proud and excited for his future. Have you talked to him recently?";
      referencedMemories = ["memory-3"];
    } else if (lowerMessage.includes("dorothy") || lowerMessage.includes("tea") || lowerMessage.includes("friend")) {
      response = "I see you've been planning to have tea with Dorothy on Friday, as you mentioned in your recent journal. She seems like a wonderful friend. Are you looking forward to your meeting?";
      referencedMemories = ["memory-2"];
    } else if (lowerMessage.includes("book") || lowerMessage.includes("read")) {
      response = "From your journal entry on February 15th, I know you're reading 'The Midnight Library' for your book club. You mentioned feeling inspired by the story. Would you like to discuss it?";
      referencedMemories = ["memory-4"];
    } else if (lowerMessage.includes("how are you") || lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      response = `Hello ${currentUser.name.split(' ')[0]}! I'm here to chat with you. I've been keeping track of your ${journalEntries.length} journal entries and ${memories.length} important memories. What would you like to talk about today?`;
    } else if (lowerMessage.includes("remind") || lowerMessage.includes("remember") || lowerMessage.includes("forgot")) {
      response = "Of course! I'm here to help you remember. Looking at your recent journals, you've talked about your garden, your grandson's college acceptance, and your upcoming tea with Dorothy. Which would you like to know more about?";
      referencedMemories = ["memory-1", "memory-2", "memory-3"];
    } else if (lowerMessage.includes("happy") || lowerMessage.includes("joy") || lowerMessage.includes("feel")) {
      response = "I've noticed you've had some wonderful happy moments recently! You expressed joy about your spring flowers blooming, and you had a lovely laugh with Robert during your video call. Your recent journals show you've been in a positive mood overall.";
    } else {
      response = "That's interesting! I'm always learning from your journals. Feel free to share more, or you can ask me about any of your past memories - I have information from all your journal entries to help you remember important moments.";
    }

    return {
      id: `ai-${Date.now()}`,
      role: "ai",
      content: response,
      timestamp: new Date(),
      referencedMemories,
    };
  };

  const startListening = () => {
    setVoiceState("listening");
    setUserTranscript("");
    
    // Simulate voice recognition
    setTimeout(() => {
      setVoiceState("processing");
      
      const mockPhrases = [
        "Tell me about my garden",
        "How is my grandson Tommy doing?",
        "What did I plan with Dorothy?",
        "Remind me what book I'm reading",
        "What have I been happy about lately?",
      ];
      
      const randomPhrase = mockPhrases[Math.floor(Math.random() * mockPhrases.length)];
      setUserTranscript(randomPhrase);
      
      // Add user message
      const userMessage: ConversationMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: randomPhrase,
        timestamp: new Date(),
      };
      
      setTimeout(() => {
        setConversation(prev => [...prev, userMessage]);
        
        // Generate AI response
        setTimeout(() => {
          setVoiceState("speaking");
          const aiResponse = generateAIResponse(randomPhrase);
          setConversation(prev => [...prev, aiResponse]);
          
          // Return to idle after "speaking"
          setTimeout(() => {
            setVoiceState("idle");
            setUserTranscript("");
          }, 3000);
        }, 1000);
      }, 500);
    }, 2000);
  };

  const stopListening = () => {
    setVoiceState("idle");
    setUserTranscript("");
  };

  const handleSendText = () => {
    if (!textInput.trim()) return;

    const userMessage: ConversationMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textInput,
      timestamp: new Date(),
    };

    setConversation((prev) => [...prev, userMessage]);
    setTextInput("");

    // Generate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(textInput);
      setConversation((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const getMemoryById = (id: string) => {
    return memories.find(m => m.id === id);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl mb-2">AI Voice Companion</h1>
        <p className="text-xl text-gray-600">Have a conversation with AI that knows your story</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Communication Interface */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="text" className="w-full" onValueChange={(value) => setActiveTab(value as "voice" | "text")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text" className="text-lg">
                <MessageSquare className="w-5 h-5 mr-2" />
                Text Chat
              </TabsTrigger>
              <TabsTrigger value="voice" className="text-lg">
                <Mic className="w-5 h-5 mr-2" />
                Voice Chat
              </TabsTrigger>
            </TabsList>

            {/* Text Chat Tab */}
            <TabsContent value="text">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Chat Messages */}
                    <div className="min-h-[400px] max-h-[400px] overflow-y-auto p-4 bg-gray-50 rounded-lg">
                      {conversation.length === 0 ? (
                        <div className="text-center py-12">
                          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600">Start a conversation</p>
                          <p className="text-sm text-gray-500 mt-2">
                            Type a message to chat with your AI companion
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {conversation.map((message) => (
                            <div
                              key={message.id}
                              className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                            >
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                message.role === "user" ? "bg-amber-100" : "bg-blue-100"
                              }`}>
                                {message.role === "user" ? (
                                  <User className="w-6 h-6 text-amber-700" />
                                ) : (
                                  <Bot className="w-6 h-6 text-blue-700" />
                                )}
                              </div>
                              
                              <div className={`flex-1 ${message.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
                                <div className={`max-w-md px-4 py-3 rounded-2xl ${
                                  message.role === "user"
                                    ? "bg-amber-600 text-white"
                                    : "bg-white border border-gray-200"
                                }`}>
                                  <p className="text-base">{message.content}</p>
                                  
                                  {message.referencedMemories && message.referencedMemories.length > 0 && (
                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                      <div className="flex items-center gap-1 mb-2">
                                        <Sparkles className="w-4 h-4 text-amber-600" />
                                        <span className="text-xs text-gray-600 font-medium">Referenced from your journals:</span>
                                      </div>
                                      <div className="space-y-2">
                                        {message.referencedMemories.map((memId) => {
                                          const memory = getMemoryById(memId);
                                          if (!memory) return null;
                                          return (
                                            <div key={memId} className="text-xs bg-amber-50 border border-amber-200 rounded p-2">
                                              <Badge variant="secondary" className="text-xs mb-1">
                                                {memory.category}
                                              </Badge>
                                              <p className="text-gray-700">{memory.description}</p>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <span className="text-xs text-gray-500 mt-1 px-2">
                                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                            </div>
                          ))}
                          <div ref={conversationEndRef} />
                        </div>
                      )}
                    </div>

                    {/* Text Input */}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type your message here..."
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendText()}
                        className="flex-1 text-lg py-6"
                      />
                      <Button
                        onClick={handleSendText}
                        size="lg"
                        className="bg-amber-600 hover:bg-amber-700 px-6"
                      >
                        <Send className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Voice Chat Tab */}
            <TabsContent value="voice">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    {/* Voice Visualization */}
                    <div className="relative mb-8">
                      <div className={`w-48 h-48 rounded-full flex items-center justify-center transition-all ${
                        voiceState === "idle" ? "bg-gray-100" :
                        voiceState === "listening" ? "bg-blue-100 animate-pulse" :
                        voiceState === "processing" ? "bg-amber-100" :
                        "bg-green-100 animate-pulse"
                      }`}>
                        <div className={`w-40 h-40 rounded-full flex items-center justify-center transition-all ${
                          voiceState === "idle" ? "bg-gray-200" :
                          voiceState === "listening" ? "bg-blue-200" :
                          voiceState === "processing" ? "bg-amber-200" :
                          "bg-green-200"
                        }`}>
                          <div className={`w-32 h-32 rounded-full flex items-center justify-center ${
                            voiceState === "idle" ? "bg-gray-300" :
                            voiceState === "listening" ? "bg-blue-300" :
                            voiceState === "processing" ? "bg-amber-300" :
                            "bg-green-300"
                          }`}>
                            {voiceState === "speaking" || voiceState === "processing" ? (
                              <Brain className="w-16 h-16 text-white" />
                            ) : (
                              <Mic className="w-16 h-16 text-white" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Waveform Animation */}
                      {(voiceState === "listening" || voiceState === "speaking") && (
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-1 bg-amber-600 rounded-full animate-pulse`}
                              style={{
                                height: `${Math.random() * 30 + 10}px`,
                                animationDelay: `${i * 0.1}s`,
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Status Text */}
                    <div className="text-center mb-6">
                      <p className="text-2xl mb-2">
                        {voiceState === "idle" && "Ready to listen"}
                        {voiceState === "listening" && "Listening..."}
                        {voiceState === "processing" && "Processing..."}
                        {voiceState === "speaking" && "Speaking..."}
                      </p>
                      {userTranscript && (
                        <p className="text-sm text-gray-600 italic">"{userTranscript}"</p>
                      )}
                      {voiceState === "idle" && (
                        <p className="text-sm text-gray-500 mt-2">
                          Click the microphone to start a conversation
                        </p>
                      )}
                    </div>

                    {/* Controls */}
                    <div className="flex gap-4">
                      {voiceState === "idle" ? (
                        <Button
                          size="lg"
                          onClick={startListening}
                          className="bg-amber-600 hover:bg-amber-700 text-lg px-8 py-6"
                        >
                          <Mic className="w-6 h-6 mr-2" />
                          Start Talking
                        </Button>
                      ) : (
                        <Button
                          size="lg"
                          onClick={stopListening}
                          variant="destructive"
                          className="text-lg px-8 py-6"
                        >
                          <MicOff className="w-6 h-6 mr-2" />
                          Stop
                        </Button>
                      )}
                      
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-lg px-6 py-6"
                      >
                        {isMuted ? (
                          <VolumeX className="w-6 h-6" />
                        ) : (
                          <Volume2 className="w-6 h-6" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Conversation History - Only show when voice mode and has conversation */}
          {activeTab === "voice" && conversation.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Conversation History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversation.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === "user" ? "bg-amber-100" : "bg-blue-100"
                      }`}>
                        {message.role === "user" ? (
                          <User className="w-6 h-6 text-amber-700" />
                        ) : (
                          <Bot className="w-6 h-6 text-blue-700" />
                        )}
                      </div>
                      
                      <div className={`flex-1 ${message.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
                        <div className={`max-w-md px-4 py-3 rounded-2xl ${
                          message.role === "user"
                            ? "bg-amber-600 text-white"
                            : "bg-white border border-gray-200"
                        }`}>
                          <p className="text-base">{message.content}</p>
                          
                          {message.referencedMemories && message.referencedMemories.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <div className="flex items-center gap-1 mb-2">
                                <Sparkles className="w-4 h-4 text-amber-600" />
                                <span className="text-xs text-gray-600 font-medium">Referenced from your journals:</span>
                              </div>
                              <div className="space-y-2">
                                {message.referencedMemories.map((memId) => {
                                  const memory = getMemoryById(memId);
                                  if (!memory) return null;
                                  return (
                                    <div key={memId} className="text-xs bg-amber-50 border border-amber-200 rounded p-2">
                                      <Badge variant="secondary" className="text-xs mb-1">
                                        {memory.category}
                                      </Badge>
                                      <p className="text-gray-700">{memory.description}</p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 mt-1 px-2">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div ref={conversationEndRef} />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-amber-600" />
                What AI Knows
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Journal Entries</span>
                  <Badge variant="secondary">{journalEntries.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Stored Memories</span>
                  <Badge variant="secondary">{memories.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Your Interests</span>
                  <Badge variant="secondary">{currentUser.interests.length}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conversation Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-amber-600 rounded-full mt-1.5 flex-shrink-0" />
                <p className="text-gray-700">Ask about your past journal entries</p>
              </div>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-amber-600 rounded-full mt-1.5 flex-shrink-0" />
                <p className="text-gray-700">Request reminders about people or events</p>
              </div>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-amber-600 rounded-full mt-1.5 flex-shrink-0" />
                <p className="text-gray-700">Talk about your feelings and experiences</p>
              </div>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-amber-600 rounded-full mt-1.5 flex-shrink-0" />
                <p className="text-gray-700">Ask for suggestions based on your interests</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Example Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start text-left h-auto py-3 px-4"
                onClick={() => {
                  const msg: ConversationMessage = {
                    id: `user-${Date.now()}`,
                    role: "user",
                    content: "Tell me about my garden",
                    timestamp: new Date(),
                  };
                  setConversation(prev => [...prev, msg]);
                  setTimeout(() => {
                    setConversation(prev => [...prev, generateAIResponse("Tell me about my garden")]);
                  }, 1000);
                }}
              >
                <span className="text-sm">"Tell me about my garden"</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start text-left h-auto py-3 px-4"
                onClick={() => {
                  const msg: ConversationMessage = {
                    id: `user-${Date.now()}`,
                    role: "user",
                    content: "How is my grandson Tommy?",
                    timestamp: new Date(),
                  };
                  setConversation(prev => [...prev, msg]);
                  setTimeout(() => {
                    setConversation(prev => [...prev, generateAIResponse("How is my grandson Tommy?")]);
                  }, 1000);
                }}
              >
                <span className="text-sm">"How is my grandson Tommy?"</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start text-left h-auto py-3 px-4"
                onClick={() => {
                  const msg: ConversationMessage = {
                    id: `user-${Date.now()}`,
                    role: "user",
                    content: "What makes me happy?",
                    timestamp: new Date(),
                  };
                  setConversation(prev => [...prev, msg]);
                  setTimeout(() => {
                    setConversation(prev => [...prev, generateAIResponse("What makes me happy?")]);
                  }, 1000);
                }}
              >
                <span className="text-sm">"What makes me happy?"</span>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900 mb-2">Privacy & Security</p>
                  <p className="text-blue-800">
                    All conversations are processed securely. The AI only knows what you've shared in your journals.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}