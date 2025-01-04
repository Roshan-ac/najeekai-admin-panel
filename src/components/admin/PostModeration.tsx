import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Filter, MoreVertical, Trash2 } from "lucide-react";

interface Post {
  id: string;
  title: string;
  author: string;
  category: string;
  status: string;
  date: string;
}

interface PostModerationProps {
  posts?: Post[];
  onApprove?: (ids: string[]) => void;
  onRemove?: (ids: string[]) => void;
}

const defaultPosts: Post[] = [
  {
    id: "1",
    title: "House Cleaning Service",
    author: "Jane Smith",
    category: "Cleaning",
    status: "Pending",
    date: "2024-01-15",
  },
  {
    id: "2",
    title: "Plumbing Repair",
    author: "John Doe",
    category: "Maintenance",
    status: "Pending",
    date: "2024-01-16",
  },
  {
    id: "3",
    title: "Garden Landscaping",
    author: "Mike Johnson",
    category: "Gardening",
    status: "Pending",
    date: "2024-01-17",
  },
];

const PostModeration = ({
  posts = defaultPosts,
  onApprove = () => {},
  onRemove = () => {},
}: PostModerationProps) => {
  const [selectedPosts, setSelectedPosts] = React.useState<string[]>([]);
  const [filter, setFilter] = React.useState("");

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPosts(posts.map((post) => post.id));
    } else {
      setSelectedPosts([]);
    }
  };

  const handleSelectPost = (postId: string) => {
    setSelectedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId],
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Post Moderation</h2>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Posts</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Input
            placeholder="Search posts..."
            className="w-[200px]"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Card key={post.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedPosts.includes(post.id)}
                  onCheckedChange={() => handleSelectPost(post.id)}
                />
                <div>
                  <h3 className="font-medium">{post.title}</h3>
                  <p className="text-sm text-gray-500">{post.author}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-500">
                <span>{post.category}</span>
                <span>{post.date}</span>
              </div>
              <div className="mt-2">
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                  {post.status}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={selectedPosts.length === posts.length}
            onCheckedChange={(checked: boolean) => handleSelectAll(checked)}
          />
          <span className="text-sm text-gray-500">
            {selectedPosts.length} posts selected
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => onApprove(selectedPosts)}
            disabled={selectedPosts.length === 0}
          >
            Approve Selected
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                disabled={selectedPosts.length === 0}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove Selected
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Remove Selected Posts</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to remove {selectedPosts.length}{" "}
                  selected posts? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onRemove(selectedPosts)}>
                  Remove
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default PostModeration;
