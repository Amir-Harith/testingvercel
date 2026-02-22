import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Heart, MessageCircle, Share2, Send, Image as ImageIcon } from "lucide-react";
import { users, currentUser } from "../data/mockData";
import { Badge } from "../components/ui/badge";

interface Post {
  id: string;
  author: typeof currentUser;
  content: string;
  image?: string;
  timestamp: Date;
  likes: number;
  comments: number;
  isLiked: boolean;
}

const mockPosts: Post[] = [
  {
    id: "post-1",
    author: users[0],
    content: "Just got back from a wonderful photography walk in Discovery Park! The cherry blossoms are starting to bloom. Anyone else enjoy nature photography? 🌸📷",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600",
    timestamp: new Date(2026, 1, 21, 9, 30),
    likes: 12,
    comments: 5,
    isLiked: true,
  },
  {
    id: "post-2",
    author: users[1],
    content: "Just finished knitting a scarf for my granddaughter's birthday! The pattern was challenging but so rewarding. Fellow knitters, what projects are you working on?",
    image: "https://images.unsplash.com/photo-1586339277861-99e4153fffb8?w=600",
    timestamp: new Date(2026, 1, 20, 15, 45),
    likes: 18,
    comments: 8,
    isLiked: false,
  },
  {
    id: "post-3",
    author: users[2],
    content: "Spotted a beautiful Blue Heron by the lake this morning during my walk. Nature never ceases to amaze me! 🦅",
    timestamp: new Date(2026, 1, 20, 8, 20),
    likes: 15,
    comments: 6,
    isLiked: true,
  },
  {
    id: "post-4",
    author: users[3],
    content: "My watercolor painting class is going wonderfully! Today we painted landscapes. It's never too late to learn something new. 🎨",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600",
    timestamp: new Date(2026, 1, 19, 14, 10),
    likes: 22,
    comments: 10,
    isLiked: false,
  },
];

export function SocialFeed() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [newPost, setNewPost] = useState("");

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked,
        };
      }
      return post;
    }));
  };

  const handlePost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: `post-${Date.now()}`,
        author: currentUser,
        content: newPost,
        timestamp: new Date(),
        likes: 0,
        comments: 0,
        isLiked: false,
      };
      setPosts([post, ...posts]);
      setNewPost("");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl mb-2">Social Feed</h1>
        <p className="text-xl text-gray-600">Connect and share with your community</p>
      </div>

      {/* Create Post */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Share an Update</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="What's on your mind, Margaret?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="min-h-[120px] text-lg resize-none"
          />
          <div className="flex items-center justify-between">
            <Button variant="outline" size="lg">
              <ImageIcon className="w-5 h-5 mr-2" />
              Add Photo
            </Button>
            <Button 
              onClick={handlePost}
              disabled={!newPost.trim()}
              size="lg"
              className="bg-amber-600 hover:bg-amber-700"
            >
              <Send className="w-5 h-5 mr-2" />
              Post
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="pt-6">
              {/* Post Header */}
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-lg">{post.author.name}</h3>
                    {post.author.id === currentUser.id && (
                      <Badge variant="secondary" className="text-xs">You</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{post.author.location}</p>
                  <p className="text-sm text-gray-500">
                    {post.timestamp.toLocaleDateString()} at {post.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-base mb-4 leading-relaxed">{post.content}</p>

              {/* Post Image */}
              {post.image && (
                <img
                  src={post.image}
                  alt="Post content"
                  className="w-full rounded-lg mb-4 max-h-96 object-cover"
                />
              )}

              {/* Post Actions */}
              <div className="flex items-center gap-1 pt-4 border-t">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => handleLike(post.id)}
                  className={post.isLiked ? "text-rose-600" : ""}
                >
                  <Heart className={`w-5 h-5 mr-2 ${post.isLiked ? "fill-current" : ""}`} />
                  {post.likes} {post.likes === 1 ? 'Like' : 'Likes'}
                </Button>
                <Button variant="ghost" size="lg">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {post.comments} {post.comments === 1 ? 'Comment' : 'Comments'}
                </Button>
                <Button variant="ghost" size="lg" className="ml-auto">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Suggested Connections */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>People You May Know</CardTitle>
          <p className="text-sm text-gray-600">Based on your interests</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.filter(u => !u.isConnected).map((user) => (
              <div key={user.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-lg mb-1">{user.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{user.location}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {user.interests.slice(0, 3).map((interest) => (
                      <Badge key={interest} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-700">{user.bio}</p>
                </div>
                <Button className="bg-amber-600 hover:bg-amber-700">
                  Connect
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
