import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Worker } from "../App";
import { Mail, Phone, Calendar, Award, Clock } from "lucide-react";
import { Badge } from "./ui/badge";

type ViewWorkerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  worker: Worker | null;
};

export function ViewWorkerDialog({
  open,
  onOpenChange,
  worker,
}: ViewWorkerDialogProps) {
  if (!worker) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Worker Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-2xl">
                {worker.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-gray-900 mb-1">{worker.name}</h2>
              <p className="text-gray-600 mb-2">{worker.role}</p>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  worker.status === "active"
                    ? "bg-green-100 text-green-700"
                    : worker.status === "on-leave"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {worker.status === "active"
                  ? "Active"
                  : worker.status === "on-leave"
                  ? "On Leave"
                  : "Inactive"}
              </span>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-gray-900 mb-3">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="w-5 h-5 text-gray-400" />
                <span>{worker.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="w-5 h-5 text-gray-400" />
                <span>{worker.phone}</span>
              </div>
            </div>
          </div>

          {/* Work Information */}
          <div>
            <h3 className="text-gray-900 mb-3">Work Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm mb-1">Department</p>
                <p className="text-gray-900">{worker.department}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Join Date</p>
                <div className="flex items-center gap-2 text-gray-900">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {worker.joinDate}
                </div>
              </div>
            </div>
          </div>

          {/* Availability */}
          {worker.availability && (
            <div>
              <h3 className="text-gray-900 mb-3">Availability</h3>
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="w-5 h-5 text-gray-400" />
                <span>{worker.availability}</span>
              </div>
            </div>
          )}

          {/* Certifications */}
          {worker.certifications.length > 0 && (
            <div>
              <h3 className="text-gray-900 mb-3">Certifications</h3>
              <div className="flex items-start gap-2">
                <Award className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex flex-wrap gap-2">
                  {worker.certifications.map((cert, index) => (
                    <Badge key={index} variant="secondary">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
