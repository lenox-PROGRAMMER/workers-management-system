import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../types";
import { mockUsers } from "../data/mockUsers";

type AuthContextType = {
  currentUser: User | null;
  users: User[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  registerUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
  changePassword: (userId: string, newPassword: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);

  const login = (email: string, password: string): boolean => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const registerUser = (user: User) => {
    setUsers([...users, user]);
  };

  const updateUser = (user: User) => {
    setUsers(users.map((u) => (u.id === user.id ? user : u)));
    if (currentUser?.id === user.id) {
      setCurrentUser(user);
    }
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const changePassword = (userId: string, newPassword: string) => {
    setUsers(
      users.map((u) =>
        u.id === userId
          ? { ...u, password: newPassword, mustChangePassword: false }
          : u
      )
    );
    if (currentUser?.id === userId) {
      setCurrentUser({ ...currentUser, password: newPassword, mustChangePassword: false });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        login,
        logout,
        registerUser,
        updateUser,
        deleteUser,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
