import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Users, UserCheck, UserX, Shield, Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { RegisterUserDialog } from "../RegisterUserDialog";
import { ViewUserDialog } from "../ViewUserDialog";
import { AssignRoleDialog } from "../AssignRoleDialog";
import { User } from "../../types";
import { toast } from "sonner@2.0.3";

export function AdminDashboard() {
  const { currentUser, users, deleteUser } = useAuth();
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [assignRoleDialogOpen, setAssignRoleDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    inactive: users.filter((u) => u.status === "inactive").length,
    admins: users.filter((u) => u.role === "admin").length,
  };

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.workNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const handleDeleteUser = (id: string) => {
    if (id === currentUser?.id) {
      toast.error("You cannot delete your own account");
      return;
    }
    deleteUser(id);
    toast.success("User deleted successfully");
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setViewDialogOpen(true);
  };

  const handleAssignRole = (user: User) => {
    setSelectedUser(user);
    setAssignRoleDialogOpen(true);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, {currentUser?.fullName}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Total Users</p>
              <p className="text-gray-900">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Active Users</p>
              <p className="text-gray-900">{stats.active}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Inactive Users</p>
              <p className="text-gray-900">{stats.inactive}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <UserX className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Administrators</p>
              <p className="text-gray-900">{stats.admins}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* User Management Section */}
      <Card className="border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-900">User Management</h2>
            <Button
              onClick={() => setRegisterDialogOpen(true)}
              className="bg-[#DC143C] hover:bg-[#B01030]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Register User
            </Button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
                <SelectItem value="volunteer">Volunteer</SelectItem>
                <SelectItem value="intern">Intern</SelectItem>
                <SelectItem value="attachee">Attachee</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Work Number</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Membership</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 text-sm">
                            {user.fullName.charAt(0)}
                          </span>
                        </div>
                        <span>{user.fullName}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.workNumber}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span className="capitalize">{user.role}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {user.membershipType.replace(/-/g, " ")}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          user.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewUser(user)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAssignRole(user)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          disabled={user.id === currentUser?.id}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Dialogs */}
      <RegisterUserDialog
        open={registerDialogOpen}
        onOpenChange={setRegisterDialogOpen}
      />
      <ViewUserDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        user={selectedUser}
      />
      <AssignRoleDialog
        open={assignRoleDialogOpen}
        onOpenChange={setAssignRoleDialogOpen}
        user={selectedUser}
      />
    </div>
  );
}
