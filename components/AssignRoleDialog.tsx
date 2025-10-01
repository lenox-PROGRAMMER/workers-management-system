import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useAuth } from "../contexts/AuthContext";
import { User, UserRole, MembershipType } from "../types";
import { toast } from "sonner@2.0.3";

type AssignRoleDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
};

export function AssignRoleDialog({
  open,
  onOpenChange,
  user,
}: AssignRoleDialogProps) {
  const { updateUser } = useAuth();
  const [role, setRole] = useState<UserRole>("volunteer");
  const [membershipType, setMembershipType] = useState<MembershipType>("ordinary-member");
  const [status, setStatus] = useState<"active" | "inactive">("active");

  useEffect(() => {
    if (user) {
      setRole(user.role);
      setMembershipType(user.membershipType);
      setStatus(user.status);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    const updatedUser: User = {
      ...user,
      role,
      membershipType,
      status,
    };

    updateUser(updatedUser);
    toast.success("User role and details updated successfully!");
    onOpenChange(false);
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Role & Update Details</DialogTitle>
          <DialogDescription>
            Update the role, membership type, and status for this user.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div>
              <p className="text-sm text-gray-500 mb-4">
                Editing user: <span className="text-gray-900">{user.fullName}</span>
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="volunteer">Volunteer</SelectItem>
                  <SelectItem value="intern">Intern</SelectItem>
                  <SelectItem value="attachee">Attachee</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="membershipType">Membership Type</Label>
              <Select
                value={membershipType}
                onValueChange={(value: MembershipType) => setMembershipType(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select membership type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="life-member">Life Member</SelectItem>
                  <SelectItem value="ordinary-member">Ordinary Member</SelectItem>
                  <SelectItem value="youth-in-school">Youth in School</SelectItem>
                  <SelectItem value="youth-out-of-school">
                    Youth out of School
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={status}
                onValueChange={(value: "active" | "inactive") => setStatus(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#DC143C] hover:bg-[#B01030]">
              Update User
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
