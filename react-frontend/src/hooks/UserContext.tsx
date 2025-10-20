import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";

export type User = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  created_at: string;
  role: string;
};

// Kiểu dữ liệu cho Context
type UserContextType = {
  user: User | null;
  setUser: (user: User) => void;
};

// Tạo context mặc định
const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

// provider
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook để dễ sử dụng context
export const useUser = () => useContext(UserContext);
