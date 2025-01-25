import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";

interface HeaderComponentProps {
  setIsOpen: (value: boolean) => void;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ setIsOpen }) => {
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
        <p className="hidden sm:block text-gray-700">Profile</p>
      </div>
    </header>
  );
};

export default HeaderComponent;
