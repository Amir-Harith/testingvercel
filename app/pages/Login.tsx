import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Heart, Sparkles } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, this would validate credentials
    localStorage.setItem("isAuthenticated", "true");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-rose-400 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl mb-2">The Golden Years</h1>
          <p className="text-lg text-gray-600">
            Stay connected, remember moments, share your story
          </p>
        </div>

        {/* Login Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Sign in to continue your journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-lg py-6"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="text-lg py-6"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full text-lg py-6 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button variant="link" className="text-gray-600">
                Forgot password?
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t">
              <p className="text-center text-sm text-gray-600 mb-3">
                Don't have an account?
              </p>
              <Button 
                variant="outline" 
                className="w-full text-lg py-6"
                onClick={() => {
                  // Mock signup - directly log in for demo
                  localStorage.setItem("isAuthenticated", "true");
                  navigate("/");
                }}
              >
                Create Account
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/50 backdrop-blur rounded-lg p-4">
            <Sparkles className="w-6 h-6 text-amber-600 mx-auto mb-2" />
            <p className="text-xs text-gray-700">AI-Powered Journals</p>
          </div>
          <div className="bg-white/50 backdrop-blur rounded-lg p-4">
            <Heart className="w-6 h-6 text-rose-600 mx-auto mb-2" />
            <p className="text-xs text-gray-700">Social Connections</p>
          </div>
          <div className="bg-white/50 backdrop-blur rounded-lg p-4">
            <Sparkles className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-xs text-gray-700">Memory Tracking</p>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          © 2026 The Golden Years. Made with love for seniors.
        </p>
      </div>
    </div>
  );
}
