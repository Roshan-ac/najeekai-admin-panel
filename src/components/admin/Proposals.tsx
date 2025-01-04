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
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Proposal {
  id: string;
  jobTitle: string;
  freelancer: string;
  client: string;
  status: "pending" | "accepted" | "rejected";
  submittedAt: string;
  budget: string;
  description: string;
}

interface ProposalsProps {
  proposals?: Proposal[];
}

const defaultProposals: Proposal[] = [
  {
    id: "1",
    jobTitle: "Website Redesign",
    freelancer: "John Doe",
    client: "Tech Corp",
    status: "pending",
    submittedAt: "2024-01-15",
    budget: "$2,500",
    description: "Complete website redesign with modern UI/UX principles",
  },
  {
    id: "2",
    jobTitle: "Mobile App Development",
    freelancer: "Jane Smith",
    client: "StartUp Inc",
    status: "accepted",
    submittedAt: "2024-01-16",
    budget: "$5,000",
    description: "Develop a cross-platform mobile application",
  },
  {
    id: "3",
    jobTitle: "Logo Design",
    freelancer: "Bob Wilson",
    client: "Design Agency",
    status: "rejected",
    submittedAt: "2024-01-17",
    budget: "$500",
    description: "Create a modern and minimalist logo design",
  },
];

const Proposals = ({ proposals = defaultProposals }: ProposalsProps) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Job Proposals</h2>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search proposals..."
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

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Freelancer</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposals.map((proposal) => (
              <TableRow key={proposal.id}>
                <TableCell>{proposal.jobTitle}</TableCell>
                <TableCell>{proposal.freelancer}</TableCell>
                <TableCell>{proposal.client}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      proposal.status === "accepted"
                        ? "default"
                        : proposal.status === "rejected"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {proposal.status}
                  </Badge>
                </TableCell>
                <TableCell>{proposal.budget}</TableCell>
                <TableCell>{proposal.submittedAt}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Proposal Details</DialogTitle>
                        <DialogDescription>
                          <div className="mt-4 space-y-4">
                            <div>
                              <h4 className="font-semibold">Job Title</h4>
                              <p>{proposal.jobTitle}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold">Description</h4>
                              <p>{proposal.description}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold">Freelancer</h4>
                                <p>{proposal.freelancer}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold">Client</h4>
                                <p>{proposal.client}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold">Budget</h4>
                                <p>{proposal.budget}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold">Status</h4>
                                <Badge
                                  variant={
                                    proposal.status === "accepted"
                                      ? "default"
                                      : proposal.status === "rejected"
                                        ? "destructive"
                                        : "secondary"
                                  }
                                >
                                  {proposal.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Proposals;
