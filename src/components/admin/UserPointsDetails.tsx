
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getUsersData } from "@/lib/adminService";
import { Badge } from "@/components/ui/badge";
import { Award } from "lucide-react";

const UserPointsDetails = () => {
  const users = getUsersData();

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Award className="mr-2 h-5 w-5 text-yellow-500" />
          User Points & Details
        </CardTitle>
        <CardDescription>Manage user points and view user activity</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Points</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Last Active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Award className="mr-1 h-4 w-4 text-yellow-500" />
                    <span>{user.points}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === "Active" ? "success" : "secondary"}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell>{user.lastActive}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UserPointsDetails;
