import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Bell, Shield, Palette, Volume2, Brain, Save } from "lucide-react";

export function Settings() {
  const [notifications, setNotifications] = useState({
    journal: true,
    messages: true,
    connections: true,
    happyMoments: true,
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    shareInterests: true,
    aiProcessing: true,
  });

  const [accessibility, setAccessibility] = useState({
    fontSize: "large",
    highContrast: false,
    screenReader: false,
  });

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl mb-2">Settings</h1>
        <p className="text-xl text-gray-600">Customize your experience</p>
      </div>

      <div className="space-y-6">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-600" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="journal-notif" className="text-base">Journal Reminders</Label>
                <p className="text-sm text-gray-600">Get reminded to record your daily journal</p>
              </div>
              <Switch
                id="journal-notif"
                checked={notifications.journal}
                onCheckedChange={(checked) => setNotifications({...notifications, journal: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="messages-notif" className="text-base">New Messages</Label>
                <p className="text-sm text-gray-600">Notify when you receive new messages</p>
              </div>
              <Switch
                id="messages-notif"
                checked={notifications.messages}
                onCheckedChange={(checked) => setNotifications({...notifications, messages: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="connections-notif" className="text-base">Connection Requests</Label>
                <p className="text-sm text-gray-600">Notify when someone wants to connect</p>
              </div>
              <Switch
                id="connections-notif"
                checked={notifications.connections}
                onCheckedChange={(checked) => setNotifications({...notifications, connections: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="happy-notif" className="text-base">Happy Moments</Label>
                <p className="text-sm text-gray-600">Notify when AI detects a happy moment</p>
              </div>
              <Switch
                id="happy-notif"
                checked={notifications.happyMoments}
                onCheckedChange={(checked) => setNotifications({...notifications, happyMoments: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-600" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="profile-visible" className="text-base">Public Profile</Label>
                <p className="text-sm text-gray-600">Make your profile visible to others</p>
              </div>
              <Switch
                id="profile-visible"
                checked={privacy.profileVisible}
                onCheckedChange={(checked) => setPrivacy({...privacy, profileVisible: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="share-interests" className="text-base">Share Interests</Label>
                <p className="text-sm text-gray-600">Allow others to see your interests for better matching</p>
              </div>
              <Switch
                id="share-interests"
                checked={privacy.shareInterests}
                onCheckedChange={(checked) => setPrivacy({...privacy, shareInterests: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="ai-processing" className="text-base">AI Processing</Label>
                <p className="text-sm text-gray-600">Allow AI to analyze journals and conversations</p>
              </div>
              <Switch
                id="ai-processing"
                checked={privacy.aiProcessing}
                onCheckedChange={(checked) => setPrivacy({...privacy, aiProcessing: checked})}
              />
            </div>

            <div className="pt-4 border-t">
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-amber-600" />
              AI Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="memory-sensitivity" className="text-base mb-2 block">Memory Importance Sensitivity</Label>
              <p className="text-sm text-gray-600 mb-3">How selective should AI be when saving memories?</p>
              <Select defaultValue="medium">
                <SelectTrigger id="memory-sensitivity">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Save Most Memories (Less Selective)</SelectItem>
                  <SelectItem value="medium">Balanced</SelectItem>
                  <SelectItem value="high">Save Only Important Memories (More Selective)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="happy-detection" className="text-base mb-2 block">Happy Moment Detection</Label>
              <p className="text-sm text-gray-600 mb-3">How sensitive should AI be to detecting happiness?</p>
              <Select defaultValue="medium">
                <SelectTrigger id="happy-detection">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Less Sensitive</SelectItem>
                  <SelectItem value="medium">Balanced</SelectItem>
                  <SelectItem value="high">More Sensitive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="recommendation-frequency" className="text-base mb-2 block">Connection Recommendations</Label>
              <p className="text-sm text-gray-600 mb-3">How often to receive new connection suggestions?</p>
              <Select defaultValue="weekly">
                <SelectTrigger id="recommendation-frequency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Accessibility */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-amber-600" />
              Accessibility
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="font-size" className="text-base mb-2 block">Text Size</Label>
              <Select 
                value={accessibility.fontSize}
                onValueChange={(value) => setAccessibility({...accessibility, fontSize: value})}
              >
                <SelectTrigger id="font-size">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large (Default)</SelectItem>
                  <SelectItem value="xlarge">Extra Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="high-contrast" className="text-base">High Contrast Mode</Label>
                <p className="text-sm text-gray-600">Increase contrast for better visibility</p>
              </div>
              <Switch
                id="high-contrast"
                checked={accessibility.highContrast}
                onCheckedChange={(checked) => setAccessibility({...accessibility, highContrast: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="screen-reader" className="text-base">Screen Reader Support</Label>
                <p className="text-sm text-gray-600">Enhanced support for screen readers</p>
              </div>
              <Switch
                id="screen-reader"
                checked={accessibility.screenReader}
                onCheckedChange={(checked) => setAccessibility({...accessibility, screenReader: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Audio & Video */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-amber-600" />
              Audio & Video
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="video-quality" className="text-base mb-2 block">Video Recording Quality</Label>
              <Select defaultValue="high">
                <SelectTrigger id="video-quality">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (Saves Storage)</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High (Best Quality)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="auto-caption" className="text-base mb-2 block">Auto Captions</Label>
              <p className="text-sm text-gray-600 mb-3">Automatically generate captions for video journals</p>
              <Switch id="auto-caption" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
            <Save className="w-5 h-5 mr-2" />
            Save All Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
