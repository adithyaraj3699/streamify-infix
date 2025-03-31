
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getRecentActivity, deleteMovie } from "@/lib/adminService";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const RecentActivity = () => {
  const { toast } = useToast();
  const [activities, setActivities] = useState(getRecentActivity());

  const handleDeleteMovie = (id: number, title: string) => {
    try {
      deleteMovie(id.toString());
      setActivities(activities.filter(activity => activity.id !== id));
      
      toast({
        title: "Movie Deleted",
        description: `${title} has been successfully removed.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete movie. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest user interactions</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell className="font-medium">{activity.user}</TableCell>
                <TableCell>{activity.action}</TableCell>
                <TableCell>{activity.item}</TableCell>
                <TableCell>
                  {format(new Date(activity.timestamp), "MMM d, h:mm a")}
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-100"
                    onClick={() => handleDeleteMovie(activity.id, activity.item)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
