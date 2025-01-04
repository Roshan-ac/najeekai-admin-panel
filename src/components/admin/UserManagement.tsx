import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface User {
  id: string;
  name: string;
  email: string;
  status: "active" | "suspended" | "pending";
  type: "freelancer" | "client";
  joinDate: string;
}

interface UserManagementProps {
  users?: User[];
  onVerify?: (userId: string) => void;
  onSuspend?: (userId: string) => void;
  onDelete?: (userId: string) => void;
}

const defaultUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    status: "active",
    type: "freelancer",
    joinDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    status: "pending",
    type: "client",
    joinDate: "2024-01-16",
  },
  {
    id: "3",
    name: "Bob Wilson",
    email: "bob@example.com",
    status: "suspended",
    type: "freelancer",
    joinDate: "2024-01-17",
  },
];

const UserTable = ({ users, onVerify, onSuspend, onDelete }) => (
  <div className="rounded-md border">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Join Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Badge
                variant={
                  user.status === "active"
                    ? "default"
                    : user.status === "suspended"
                      ? "destructive"
                      : "secondary"
                }
              >
                {user.status}
              </Badge>
            </TableCell>
            <TableCell>{user.joinDate}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {user.status === "pending" && (
                    <DropdownMenuItem onClick={() => onVerify(user.id)}>
                      Verify
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => onSuspend(user.id)}>
                    {user.status === "suspended" ? "Unsuspend" : "Suspend"}
                  </DropdownMenuItem>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        Delete
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete User</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this user? This action
                          cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onDelete(user.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

const UserManagement = ({
  users = defaultUsers,
  onVerify = () => {},
  onSuspend = () => {},
  onDelete = () => {},
}: UserManagementProps) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">User Management</h2>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search users..."
              className="w-64"
              type="search"
            />
            <Button variant="outline" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="freelancers">Freelancers</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <UserTable
            users={users}
            onVerify={onVerify}
            onSuspend={onSuspend}
            onDelete={onDelete}
          />
        </TabsContent>

        <TabsContent value="clients">
          <UserTable
            users={users.filter((user) => user.type === "client")}
            onVerify={onVerify}
            onSuspend={onSuspend}
            onDelete={onDelete}
          />
        </TabsContent>

        <TabsContent value="freelancers">
          <UserTable
            users={users.filter((user) => user.type === "freelancer")}
            onVerify={onVerify}
            onSuspend={onSuspend}
            onDelete={onDelete}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserManagement;
