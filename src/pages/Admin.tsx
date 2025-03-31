
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import UserGrowthChart from "@/components/admin/UserGrowthChart";
import PopularGenresChart from "@/components/admin/PopularGenresChart";
import RecentActivity from "@/components/admin/RecentActivity";
import MovieUploadForm from "@/components/admin/MovieUploadForm";

const Admin = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    if (!user?.isAdmin) {
      toast({
        title: "Access Denied",
        description: "You do not have admin privileges to access this page.",
        variant: "destructive",
      });
      navigate("/home");
    }
  }, [isAuthenticated, user, navigate, toast]);

  if (!isAuthenticated || !user?.isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your movie catalog and monitor platform analytics</p>
        </div>
        
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UserGrowthChart />
              <PopularGenresChart />
            </div>
            <RecentActivity />
          </TabsContent>
          
          <TabsContent value="content" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MovieUploadForm />
              
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Content Statistics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-card rounded-lg border p-4">
                    <div className="text-2xl font-bold">278</div>
                    <div className="text-muted-foreground">Total Movies</div>
                  </div>
                  <div className="bg-card rounded-lg border p-4">
                    <div className="text-2xl font-bold">142</div>
                    <div className="text-muted-foreground">Total TV Shows</div>
                  </div>
                  <div className="bg-card rounded-lg border p-4">
                    <div className="text-2xl font-bold">54</div>
                    <div className="text-muted-foreground">Premium Content</div>
                  </div>
                  <div className="bg-card rounded-lg border p-4">
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-muted-foreground">New This Week</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-6">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">User Management</h3>
              <p className="text-muted-foreground">
                User management functionality would be implemented here in a production environment.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-card rounded-lg border p-4">
                  <div className="text-2xl font-bold">1,024</div>
                  <div className="text-muted-foreground">Total Users</div>
                </div>
                <div className="bg-card rounded-lg border p-4">
                  <div className="text-2xl font-bold">768</div>
                  <div className="text-muted-foreground">Active Users</div>
                </div>
                <div className="bg-card rounded-lg border p-4">
                  <div className="text-2xl font-bold">216</div>
                  <div className="text-muted-foreground">Premium Subscribers</div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">Platform Settings</h3>
              <p className="text-muted-foreground">
                Settings management functionality would be implemented here in a production environment.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
