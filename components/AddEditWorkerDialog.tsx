import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { Worker } from "../App";

type AddEditWorkerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  worker: Worker | null;
  onSave: (worker: Worker) => void;
};

export function AddEditWorkerDialog({
  open,
  onOpenChange,
  worker,
  onSave,
}: AddEditWorkerDialogProps) {
  const [formData, setFormData] = useState<Partial<Worker>>({
    name: "",
    role: "",
    department: "",
    status: "active",
    phone: "",
    email: "",
    joinDate: "",
    certifications: [],
    availability: "",
  });

  useEffect(() => {
    if (worker) {
      setFormData(worker);
    } else {
      setFormData({
        name: "",
        role: "",
        department: "",
        status: "active",
        phone: "",
        email: "",
        joinDate: "",
        certifications: [],
        availability: "",
      });
    }
  }, [worker, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const workerData: Worker = {
      id: worker?.id || Math.random().toString(36).substr(2, 9),
      name: formData.name || "",
      role: formData.role || "",
      department: formData.department || "",
      status: formData.status || "active",
      phone: formData.phone || "",
      email: formData.email || "",
      joinDate: formData.joinDate || new Date().toISOString().split("T")[0],
      certifications: formData.certifications || [],
      availability: formData.availability || "",
    };
    onSave(workerData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{worker ? "Edit Worker" : "Add New Worker"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
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
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Select
                value={formData.department}
                onValueChange={(value) =>
                  setFormData({ ...formData, department: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Emergency Response">
                    Emergency Response
                  </SelectItem>
                  <SelectItem value="Medical Services">
                    Medical Services
                  </SelectItem>
                  <SelectItem value="Disaster Relief">Disaster Relief</SelectItem>
                  <SelectItem value="Community Outreach">
                    Community Outreach
                  </SelectItem>
                  <SelectItem value="Blood Services">Blood Services</SelectItem>
                  <SelectItem value="Administration">Administration</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "active" | "on-leave" | "inactive") =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on-leave">On Leave</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="joinDate">Join Date *</Label>
              <Input
                id="joinDate"
                type="date"
                value={formData.joinDate}
                onChange={(e) =>
                  setFormData({ ...formData, joinDate: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Input
                id="availability"
                value={formData.availability}
                onChange={(e) =>
                  setFormData({ ...formData, availability: e.target.value })
                }
                placeholder="e.g., Mon-Fri, Weekends"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="certifications">
                Certifications (comma-separated)
              </Label>
              <Input
                id="certifications"
                value={formData.certifications?.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    certifications: e.target.value
                      .split(",")
                      .map((c) => c.trim())
                      .filter((c) => c),
                  })
                }
                placeholder="e.g., First Aid, CPR, EMT"
              />
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
              {worker ? "Update" : "Add"} Worker
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
