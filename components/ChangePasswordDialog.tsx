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
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner@2.0.3";
import { AlertCircle } from "lucide-react";

type ChangePasswordDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isRequired: boolean;
};

export function ChangePasswordDialog({
  open,
  onOpenChange,
  isRequired,
}: ChangePasswordDialogProps) {
  const { currentUser, changePassword } = useAuth();
  const [currentPasswordInput, setCurrentPasswordInput] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) return;

    // Validate current password
    if (currentPasswordInput !== currentUser.password) {
      toast.error("Current password is incorrect");
      return;
    }

    // Validate new password
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    // Validate password confirmation
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Change password
    changePassword(currentUser.id, newPassword);
    toast.success("Password changed successfully!");
    
    // Reset form
    setCurrentPasswordInput("");
    setNewPassword("");
    setConfirmPassword("");
    onOpenChange(false);
  };

  const handleCancel = () => {
    if (isRequired) {
      toast.error("You must change your password before continuing");
      return;
    }
    setCurrentPasswordInput("");
    setNewPassword("");
    setConfirmPassword("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={isRequired ? () => {} : onOpenChange}>
      <DialogContent className="max-w-md" onPointerDownOutside={(e) => isRequired && e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Update your password to keep your account secure.
          </DialogDescription>
        </DialogHeader>

        {isRequired && (
          <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-yellow-900 text-sm">
                You must change your password before continuing.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPasswordInput}
                onChange={(e) => setCurrentPasswordInput(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <p className="text-sm text-gray-500">
                Minimum 6 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isRequired}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#DC143C] hover:bg-[#B01030]">
              Change Password
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
