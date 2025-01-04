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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Eye, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Contact {
  phoneNumber: string[];
  city: string;
  state: string;
  country: string;
  secondaryEmail: string;
}

interface WorkExperience {
  companyName: string;
  joinedDate: Date;
  endDate?: Date;
  designation: string;
  location: string;
}

interface Customer {
  id: string;
  username: string;
  firstName: string;
  email: string;
  middleName?: string;
  lastName: string;
  avatar?: { image: string };
  contact?: Contact;
  status: "active" | "suspended" | "pending";
  joinDate: string;
}

interface Freelancer extends Omit<Customer, "status"> {
  availibility: boolean;
  description?: string;
  hourlyRate?: number;
  dailyRate?: number;
  skills: { skillName: string }[];
  workExperience: WorkExperience[];
  status: "active" | "suspended" | "pending";
}

interface UserManagementProps {
  customers?: Customer[];
  freelancers?: Freelancer[];
  onVerify?: (userId: string, type: "customer" | "freelancer") => void;
  onSuspend?: (userId: string, type: "customer" | "freelancer") => void;
  onDelete?: (userId: string, type: "customer" | "freelancer") => void;
}

const defaultCustomers: Customer[] = [
  {
    id: "1",
    username: "johndoe",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    status: "active",
    joinDate: "2024-01-15",
    contact: {
      phoneNumber: ["+1234567890"],
      city: "New York",
      state: "NY",
      country: "USA",
      secondaryEmail: "john.secondary@example.com",
    },
  },
];

const defaultFreelancers: Freelancer[] = [
  {
    id: "2",
    username: "janesmith",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    status: "active",
    joinDate: "2024-01-16",
    availibility: true,
    description: "Experienced web developer",
    hourlyRate: 50,
    dailyRate: 400,
    skills: [{ skillName: "React" }, { skillName: "Node.js" }],
    workExperience: [
      {
        companyName: "Tech Corp",
        joinedDate: new Date("2020-01-01"),
        endDate: new Date("2023-12-31"),
        designation: "Senior Developer",
        location: "Remote",
      },
    ],
    contact: {
      phoneNumber: ["+1987654321"],
      city: "San Francisco",
      state: "CA",
      country: "USA",
      secondaryEmail: "jane.secondary@example.com",
    },
  },
];

const UserDetailsDialog = ({
  user,
  userType,
}: {
  user: Customer | Freelancer;
  userType: "customer" | "freelancer";
}) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="ghost" size="icon">
        <Eye className="h-4 w-4" />
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>User Details</DialogTitle>
        <DialogDescription>
          <div className="mt-4 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Basic Information</h4>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Username:</span>{" "}
                    {user.username}
                  </p>
                  <p>
                    <span className="font-medium">Name:</span> {user.firstName}{" "}
                    {user.middleName} {user.lastName}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {user.email}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span>
                    <Badge
                      className="ml-2"
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
                  </p>
                </div>
              </div>
              {user.avatar && (
                <div className="flex justify-center items-start">
                  <img
                    src={user.avatar.image}
                    alt={user.username}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Contact Information */}
            {user.contact && (
              <div>
                <h4 className="font-semibold mb-2">Contact Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    {user.contact.phoneNumber.join(", ")}
                  </p>
                  <p>
                    <span className="font-medium">Secondary Email:</span>{" "}
                    {user.contact.secondaryEmail}
                  </p>
                  <p>
                    <span className="font-medium">City:</span>{" "}
                    {user.contact.city}
                  </p>
                  <p>
                    <span className="font-medium">State:</span>{" "}
                    {user.contact.state}
                  </p>
                  <p>
                    <span className="font-medium">Country:</span>{" "}
                    {user.contact.country}
                  </p>
                </div>
              </div>
            )}

            {/* Freelancer Specific Information */}
            {"availibility" in user && (
              <>
                <div>
                  <h4 className="font-semibold mb-2">
                    Professional Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <p>
                      <span className="font-medium">Availability:</span>{" "}
                      {user.availibility ? "Available" : "Not Available"}
                    </p>
                    <p>
                      <span className="font-medium">Hourly Rate:</span> $
                      {user.hourlyRate}/hr
                    </p>
                    <p>
                      <span className="font-medium">Daily Rate:</span> $
                      {user.dailyRate}/day
                    </p>
                    {user.description && (
                      <p className="col-span-2">
                        <span className="font-medium">Description:</span>{" "}
                        {user.description}
                      </p>
                    )}
                  </div>
                </div>

                {user.skills.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill.skillName}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {user.workExperience.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Work Experience</h4>
                    <div className="space-y-4">
                      {user.workExperience.map((exp, index) => (
                        <div key={index} className="border p-3 rounded-md">
                          <p className="font-medium">
                            {exp.designation} at {exp.companyName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(exp.joinedDate).toLocaleDateString()} -
                            {exp.endDate
                              ? new Date(exp.endDate).toLocaleDateString()
                              : "Present"}
                          </p>
                          <p className="text-sm text-gray-600">
                            {exp.location}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
);

const UserTable = ({ users, userType, onVerify, onSuspend, onDelete }) => (
  <div className="rounded-md border">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Location</TableHead>
          {userType === "freelancer" && <TableHead>Skills</TableHead>}
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
            <TableCell>{user.username}</TableCell>
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
            <TableCell>
              {user.contact?.city}, {user.contact?.country}
            </TableCell>
            {userType === "freelancer" && (
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {(user as Freelancer).skills
                    .slice(0, 2)
                    .map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {skill.skillName}
                      </Badge>
                    ))}
                  {(user as Freelancer).skills.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{(user as Freelancer).skills.length - 2}
                    </Badge>
                  )}
                </div>
              </TableCell>
            )}
            <TableCell>
              <div className="flex items-center gap-2">
                <UserDetailsDialog user={user} userType={userType} />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {user.status === "pending" && (
                      <DropdownMenuItem
                        onClick={() => onVerify(user.id, userType)}
                      >
                        Verify
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={() => onSuspend(user.id, userType)}
                    >
                      {user.status === "suspended" ? "Unsuspend" : "Suspend"}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete(user.id, userType)}
                      className="text-red-600"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

const UserManagement = ({
  customers = defaultCustomers,
  freelancers = defaultFreelancers,
  onVerify = () => {},
  onSuspend = () => {},
  onDelete = () => {},
}: UserManagementProps) => {
  const [searchTerm, setSearchTerm] = React.useState("");

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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

      <Tabs defaultValue="customers" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="freelancers">Freelancers</TabsTrigger>
        </TabsList>

        <TabsContent value="customers">
          <UserTable
            users={customers}
            userType="customer"
            onVerify={onVerify}
            onSuspend={onSuspend}
            onDelete={onDelete}
          />
        </TabsContent>

        <TabsContent value="freelancers">
          <UserTable
            users={freelancers}
            userType="freelancer"
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
