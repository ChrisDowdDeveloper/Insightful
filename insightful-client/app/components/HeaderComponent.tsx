"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { logout } from "@/api/api";
import { useAuth } from "@/context/AuthContext";

interface HeaderComponentProps {
  setIsOpen: (value: boolean) => void;
}



const HeaderComponent: React.FC<HeaderComponentProps> = ({ setIsOpen }) => {
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = async() => {
    try {
      await logout();
      router.replace("/");
    } catch(error) {
      alert('Logout failed');
    }
  }

  const handleLogin = async() => {
    router.push("/login");
  }

  return (
    <header className="bg-white border-none flex items-center justify-between px-6 py-4">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center md:hidden"
      >
        <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
      </button>

      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="File search"
          className="border rounded px-4 py-2 sm:w-20 md:w-96"
        />
      </div>

      <div className="flex items-center space-x-4">
        <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
          <FontAwesomeIcon
            icon={faUser}
            className="w-7 h-7"
            style={{ color: "#6B7280" }}
          />
        </div>
        {user ? (
          <button className="hidden sm:block text-gray-700" onClick={handleLogout}>Logout</button>
        ): (
          <button className="hidden sm:block text-gray-700" onClick={handleLogin}>Login</button>
        )}
      </div>
    </header>
  );
};

export default HeaderComponent;
