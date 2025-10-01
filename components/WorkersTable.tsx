import { useState } from "react";
import { Search, Plus, Filter, Eye, Edit, Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { AddEditWorkerDialog } from "./AddEditWorkerDialog";
import { ViewWorkerDialog } from "./ViewWorkerDialog";
import { mockWorkers } from "./mockData";
import { Worker } from "../App";
import { toast } from "sonner@2.0.3";

export function WorkersTable() {
  const [workers, setWorkers] = useState<Worker[]>(mockWorkers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [addEditDialogOpen, setAddEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [editMode, setEditMode] = useState(false);

  // Get unique departments
  const departments = Array.from(new Set(workers.map((w) => w.department)));

  // Filter workers
  const filteredWorkers = workers.filter((worker) => {
    const matchesSearch =
      worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || worker.status === statusFilter;

    const matchesDepartment =
      departmentFilter === "all" || worker.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const handleAddWorker = (worker: Worker) => {
    setWorkers([...workers, worker]);
    toast.success("Worker added successfully");
  };

  const handleEditWorker = (worker: Worker) => {
    setWorkers(workers.map((w) => (w.id === worker.id ? worker : w)));
    toast.success("Worker updated successfully");
  };

  const handleDeleteWorker = (id: string) => {
    setWorkers(workers.filter((w) => w.id !== id));
    toast.success("Worker deleted successfully");
  };

  const handleViewWorker = (worker: Worker) => {
    setSelectedWorker(worker);
    setViewDialogOpen(true);
  };

  const handleEditClick = (worker: Worker) => {
    setSelectedWorker(worker);
    setEditMode(true);
    setAddEditDialogOpen(true);
  };

  const handleAddClick = () => {
    setSelectedWorker(null);
    setEditMode(false);
    setAddEditDialogOpen(true);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-900 mb-2">Workers Management</h1>
          <p className="text-gray-600">Manage your Red Cross workers and volunteers</p>
        </div>
        <Button
          onClick={handleAddClick}
          className="bg-[#DC143C] hover:bg-[#B01030] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Worker
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search workers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="on-leave">On Leave</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger>
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWorkers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No workers found
                </TableCell>
              </TableRow>
            ) : (
              filteredWorkers.map((worker) => (
                <TableRow key={worker.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 text-sm">
                          {worker.name.charAt(0)}
                        </span>
                      </div>
                      <span>{worker.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{worker.role}</TableCell>
                  <TableCell>{worker.department}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
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
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{worker.email}</div>
                      <div className="text-gray-500">{worker.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>{worker.joinDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewWorker(worker)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditClick(worker)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteWorker(worker.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
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

      {/* Dialogs */}
      <AddEditWorkerDialog
        open={addEditDialogOpen}
        onOpenChange={setAddEditDialogOpen}
        worker={selectedWorker}
        onSave={editMode ? handleEditWorker : handleAddWorker}
      />
      <ViewWorkerDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        worker={selectedWorker}
      />
    </div>
  );
}
