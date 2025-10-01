import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
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
import { Copy, RefreshCw } from "lucide-react";

type RegisterUserDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function RegisterUserDialog({
  open,
  onOpenChange,
}: RegisterUserDialogProps) {
  const { currentUser, registerUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    workNumber: "",
    email: "",
    phoneNumber: "",
    role: "volunteer" as UserRole,
    membershipType: "ordinary-member" as MembershipType,
  });
  const [generatedPassword, setGeneratedPassword] = useState("");

  const generatePassword = () => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setGeneratedPassword(password);
    toast.success("Password generated!");
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(generatedPassword);
    toast.success("Password copied to clipboard!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!generatedPassword) {
      toast.error("Please generate a password first");
      return;
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      fullName: formData.fullName,
      workNumber: formData.workNumber,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      role: formData.role,
      membershipType: formData.membershipType,
      password: generatedPassword,
      createdAt: new Date().toISOString().split("T")[0],
      createdBy: currentUser?.fullName,
      status: "active",
      mustChangePassword: true,
    };

    registerUser(newUser);
    toast.success("User registered successfully!");

    // Reset form
    setFormData({
      fullName: "",
      workNumber: "",
      email: "",
      phoneNumber: "",
      role: "volunteer",
      membershipType: "ordinary-member",
    });
    setGeneratedPassword("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Register New User</DialogTitle>
          <DialogDescription>
            Fill in the user details and generate a password for the new user.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workNumber">Work Number *</Label>
              <Input
                id="workNumber"
                value={formData.workNumber}
                onChange={(e) =>
                  setFormData({ ...formData, workNumber: e.target.value })
                }
                placeholder="RC-VOL-001"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="john.doe@redcross.org"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number *</Label>
              <Input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <Select
                value={formData.role}
                onValueChange={(value: UserRole) =>
                  setFormData({ ...formData, role: value })
                }
              >
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
              <Label htmlFor="membershipType">Membership Type *</Label>
              <Select
                value={formData.membershipType}
                onValueChange={(value: MembershipType) =>
                  setFormData({ ...formData, membershipType: value })
                }
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

            {/* Password Generation */}
            <div className="md:col-span-2 space-y-2">
              <Label>Generated Password *</Label>
              <div className="flex gap-2">
                <Input
                  value={generatedPassword}
                  readOnly
                  placeholder="Click 'Generate Password' button"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={generatePassword}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={copyPassword}
                  disabled={!generatedPassword}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                Save this password and share it with the user. They will be required
                to change it on first login.
              </p>
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
              Register User
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
