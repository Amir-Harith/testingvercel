import { createBrowserRouter } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { VideoJournal } from "./pages/VideoJournal";
import { SocialFeed } from "./pages/SocialFeed";
import { Memories } from "./pages/Memories";
import { Profile } from "./pages/Profile";
import { Connections } from "./pages/Connections";
import { Chat } from "./pages/Chat";
import { Settings } from "./pages/Settings";
import { AICompanion } from "./pages/AICompanion";
import { Calendar } from "./pages/Calendar";
import { Login } from "./pages/Login";
import { Layout } from "./components/Layout";
import { Navigate } from "react-router";

// Protected Route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: Dashboard },
      { path: "journal", Component: VideoJournal },
      { path: "social", Component: SocialFeed },
      { path: "memories", Component: Memories },
      { path: "ai-companion", Component: AICompanion },
      { path: "calendar", Component: Calendar },
      { path: "profile/:userId?", Component: Profile },
      { path: "connections", Component: Connections },
      { path: "chat/:userId?", Component: Chat },
      { path: "settings", Component: Settings },
    ],
  },
]);