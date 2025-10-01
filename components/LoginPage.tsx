import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { toast } from "sonner@2.0.3";
import { Mail, Lock } from "lucide-react";

export function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        toast.success("Login successful!");
      } else {
        toast.error("Invalid email or password");
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="size-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8 border border-gray-200">
        {/* Header with Red Cross Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#DC143C] rounded-full mx-auto mb-4 flex items-center justify-center">
            <div className="relative">
              <div className="w-8 h-2 bg-white rounded-sm"></div>
              <div className="w-2 h-8 bg-white rounded-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>
          <h1 className="text-[#DC143C] mb-2">Red Cross</h1>
          <p className="text-gray-600">Workers Management System</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="your.email@redcross.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#DC143C] hover:bg-[#B01030]"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm mb-2 text-gray-700">Demo Credentials:</p>
          <div className="space-y-1 text-sm text-gray-600">
            <p>Admin: admin@redcross.org / admin123</p>
            <p>Intern: sarah.johnson@redcross.org / intern123</p>
            <p>Staff: james.wilson@redcross.org / staff123</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
