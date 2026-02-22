import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Video, Mic, Square, Play, Pause, Calendar, Sparkles } from "lucide-react";
import { journalEntries } from "../data/mockData";
import { Badge } from "../components/ui/badge";

type RecordingState = "idle" | "recording" | "paused" | "completed";

export function VideoJournal() {
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [recordingTime, setRecordingTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);

  const startRecording = () => {
    setRecordingState("recording");
    setRecordingTime(0);
    // In a real app, this would start actual video recording
  };

  const stopRecording = () => {
    setRecordingState("completed");
    // In a real app, this would stop and save the recording
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl mb-2">Video Journal</h1>
        <p className="text-xl text-gray-600">Share your day and preserve your memories</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recording Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Record Your Journal Entry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
                {recordingState === "idle" ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Click start to begin recording</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                    />
                    {recordingState === "recording" && (
                      <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full">
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                        <span>Recording</span>
                      </div>
                    )}
                  </>
                )}
                
                {recordingState !== "idle" && (
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg text-lg">
                    {formatTime(recordingTime)}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center gap-4">
                {recordingState === "idle" && (
                  <Button
                    size="lg"
                    onClick={startRecording}
                    className="bg-amber-600 hover:bg-amber-700 text-lg px-8 py-6"
                  >
                    <Video className="w-6 h-6 mr-2" />
                    Start Recording
                  </Button>
                )}

                {recordingState === "recording" && (
                  <>
                    <Button
                      size="lg"
                      onClick={stopRecording}
                      variant="destructive"
                      className="text-lg px-8 py-6"
                    >
                      <Square className="w-6 h-6 mr-2" />
                      Stop
                    </Button>
                  </>
                )}

                {recordingState === "completed" && (
                  <div className="text-center w-full space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <Sparkles className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-lg mb-2">Recording Complete!</p>
                      <p className="text-sm text-gray-600 mb-4">
                        AI is processing your journal entry to extract important memories and topics...
                      </p>
                    </div>
                    <div className="flex gap-3 justify-center">
                      <Button
                        onClick={() => setRecordingState("idle")}
                        variant="outline"
                        size="lg"
                        className="text-lg px-6"
                      >
                        Record Another
                      </Button>
                      <Button
                        size="lg"
                        className="bg-amber-600 hover:bg-amber-700 text-lg px-6"
                      >
                        Save Entry
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {recordingState === "completed" && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    <p className="font-medium text-blue-900">AI Analysis Preview</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 mb-2">Detected Topics:</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Gardening</Badge>
                      <Badge variant="secondary">Family</Badge>
                      <Badge variant="secondary">Social Plans</Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 mb-2">Mood Detected:</p>
                    <Badge className="bg-green-100 text-green-700">Happy</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 mb-2">Summary:</p>
                    <p className="text-sm">You discussed your morning garden activities and mentioned upcoming plans with friends. The AI detected positive sentiment throughout.</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recording Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <Video className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">Find good lighting</p>
                    <p className="text-gray-600">Natural light works best. Face a window if possible.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mic className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">Speak clearly</p>
                    <p className="text-gray-600">Take your time and speak at a comfortable pace.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">Share what matters</p>
                    <p className="text-gray-600">Talk about your day, feelings, and people you interacted with.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What AI Captures</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-600 rounded-full" />
                <span>Important names and events</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-600 rounded-full" />
                <span>Topics and interests</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-600 rounded-full" />
                <span>Your mood and emotions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-600 rounded-full" />
                <span>Plans and reminders</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-600 rounded-full" />
                <span>Happy moments</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Previous Entries */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Your Previous Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {journalEntries.map((entry) => (
              <div
                key={entry.id}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedEntry(entry.id)}
              >
                <div className="aspect-video relative">
                  <img
                    src={entry.thumbnail}
                    alt="Journal entry"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {formatTime(entry.duration)}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {entry.date.toLocaleDateString()}
                    </span>
                    <Badge 
                      variant="secondary"
                      className={`ml-auto ${
                        entry.mood === 'happy' ? 'bg-green-100 text-green-700' :
                        entry.mood === 'excited' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {entry.mood}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-2 mb-3">{entry.aiSummary}</p>
                  <div className="flex flex-wrap gap-1">
                    {entry.extractedTopics.slice(0, 2).map((topic) => (
                      <Badge key={topic} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
