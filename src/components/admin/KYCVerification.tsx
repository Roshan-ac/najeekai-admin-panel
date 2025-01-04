import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { Check, X, Eye } from "lucide-react";

interface KYCDocument {
  id: string;
  type: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  imageUrl: string;
  userId: string;
  userName: string;
}

interface KYCVerificationProps {
  documents?: KYCDocument[];
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

const defaultDocuments: KYCDocument[] = [
  {
    id: "1",
    type: "ID Card",
    status: "pending",
    submittedAt: "2024-01-15",
    imageUrl: "https://images.unsplash.com/photo-1633265486064-086b219458ec",
    userId: "user1",
    userName: "John Doe",
  },
  {
    id: "2",
    type: "Passport",
    status: "pending",
    submittedAt: "2024-01-16",
    imageUrl: "https://images.unsplash.com/photo-1633265486064-086b219458ec",
    userId: "user2",
    userName: "Jane Smith",
  },
];

const KYCVerification = ({
  documents = defaultDocuments,
  onApprove = () => {},
  onReject = () => {},
}: KYCVerificationProps) => {
  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">KYC Verification</h2>
        <p className="text-gray-600">Review and verify user documents</p>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <ScrollArea className="h-[600px] w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map((doc) => (
                <Card key={doc.id} className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">{doc.userName}</h3>
                      <p className="text-sm text-gray-500">{doc.type}</p>
                      <p className="text-sm text-gray-500">
                        Submitted: {doc.submittedAt}
                      </p>
                    </div>
                    <Badge variant="secondary">{doc.status}</Badge>
                  </div>

                  <div className="relative aspect-video mb-4">
                    <img
                      src={doc.imageUrl}
                      alt={`${doc.type} document`}
                      className="object-cover rounded-md w-full h-full"
                    />
                  </div>

                  <div className="flex gap-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Document Preview</AlertDialogTitle>
                          <AlertDialogDescription>
                            <img
                              src={doc.imageUrl}
                              alt={`${doc.type} document`}
                              className="w-full rounded-lg"
                            />
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Close</AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <Button
                      variant="default"
                      className="flex-1"
                      onClick={() => onApprove(doc.id)}
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Approve
                    </Button>

                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => onReject(doc.id)}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="approved">
          <div className="text-center py-8 text-gray-500">
            No approved documents to display
          </div>
        </TabsContent>

        <TabsContent value="rejected">
          <div className="text-center py-8 text-gray-500">
            No rejected documents to display
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KYCVerification;
