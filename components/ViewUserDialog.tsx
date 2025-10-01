import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { User } from "../types";
import { Mail, Phone, Calendar, Briefcase, Shield, Users } from "lucide-react";
import { Badge } from "./ui/badge";

type ViewUserDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
};

export function ViewUserDialog({
  open,
  onOpenChange,
  user,
}: ViewUserDialogProps) {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            View complete information for this user.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-2xl">
                {user.fullName.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-gray-900 mb-1">{user.fullName}</h2>
              <p className="text-gray-600 mb-2">{user.workNumber}</p>
              <div className="flex gap-2">
                <Badge variant="secondary" className="capitalize">
                  {user.role}
                </Badge>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    user.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {user.status}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-gray-900 mb-3">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="w-5 h-5 text-gray-400" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="w-5 h-5 text-gray-400" />
                <span>{user.phoneNumber}</span>
              </div>
            </div>
          </div>

          {/* Work Information */}
          <div>
            <h3 className="text-gray-900 mb-3">Work Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm mb-1">Role</p>
                <div className="flex items-center gap-2 text-gray-900">
                  <Shield className="w-4 h-4 text-gray-400" />
                  <span className="capitalize">{user.role}</span>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Work Number</p>
                <div className="flex items-center gap-2 text-gray-900">
                  <Briefcase className="w-4 h-4 text-gray-400" />
                  {user.workNumber}
                </div>
              </div>
            </div>
          </div>

          {/* Membership Information */}
          <div>
            <h3 className="text-gray-900 mb-3">Membership Information</h3>
            <div className="flex items-center gap-2 text-gray-700">
              <Users className="w-5 h-5 text-gray-400" />
              <span className="capitalize">
                {user.membershipType.replace(/-/g, " ")}
              </span>
            </div>
          </div>

          {/* Registration Details */}
          <div>
            <h3 className="text-gray-900 mb-3">Registration Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm mb-1">Created Date</p>
                <div className="flex items-center gap-2 text-gray-900">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {user.createdAt}
                </div>
              </div>
              {user.createdBy && (
                <div>
                  <p className="text-gray-500 text-sm mb-1">Created By</p>
                  <p className="text-gray-900">{user.createdBy}</p>
                </div>
              )}
            </div>
          </div>

          {/* Security Info */}
          {user.mustChangePassword && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-900 text-sm">
                ⚠️ This user must change their password on next login
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
