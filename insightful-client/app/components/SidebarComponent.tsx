import { faTimes, faHome, faComments, faHeadset, faSackDollar, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext';
import { fetchUploadedData } from '@/api/api';

interface SidebarComponentProps {
    setIsOpen: (value: boolean) => void;
    isOpen: boolean;
    setShowUpload: (value: boolean) => void;
}

interface ChartData {
    fileName: string;
    created_at: string;
  }

const SidebarComponent: React.FC<SidebarComponentProps> = ({ setIsOpen, isOpen, setShowUpload }) => {
  const { user } = useAuth();
  const [uploadedFiles, setUploadedFiles] = useState<ChartData[]>([]);

  useEffect(() => {
      if(user) {
        const loadUploads = async() => {
          try {
            const data = await fetchUploadedData();
            setUploadedFiles(data.charts);
          } catch (err) {
            console.error(err);
          }
        };
        loadUploads();
      }
    }, [user]);

  return (
    <aside
        className={`${
            isOpen ? "block" : "hidden"
        } fixed inset-0 z-50 bg-white flex flex-col transition-transform duration-300 md:relative md:block w-64 border-r sm:border-r sm:border-gray-700 shadow-lg lg:border-none`}
    >
        <div className="p-4 flex justify-between">
            <div className="h-12 w-12 bg-customBlue text-white flex items-center justify-center text-lg font-bold rounded-full">
                LOGO
            </div>
            <button
                onClick={() => setIsOpen(false)}
                className="w-5 h-5 items-center justify-center mt-3 md:hidden"
            >
                <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
            </button>
        </div>
        <nav className="flex-1 p-4 space-y-4">
            <h2 className="text-gray-500 text-xs font-bold">Main Menu</h2>
            <ul className="space-y-2">
                <li>
                    <a href="/dashboard" className="flex items-center space-x-4 text-customBlue">
                        <FontAwesomeIcon icon={faHome} className="w-5" />
                        <span>Dashboard</span>
                    </a>
                </li>
                <li>
                    <a href="/chat" className="flex items-center space-x-4 text-gray-700">
                        <FontAwesomeIcon icon={faComments} className="w-5" />
                        <span>Chat</span>
                    </a>
                </li>
                <li>
                    <a href="/customer-service" className="flex items-center space-x-4 text-gray-700">
                        <FontAwesomeIcon icon={faHeadset} className="w-5" />
                        <span>Customer Service</span>
                    </a>
                </li>
            </ul>
            <h2 className="text-gray-500 text-xs font-bold mt-10">Actions</h2>
            <div>
                <button 
                onClick={() => setShowUpload(true)}
                className="w-full bg-customBlue text-white py-2 rounded-xl flex items-center justify-center space-x-4 mb-20">
                    <FontAwesomeIcon icon={faUpload} className="w-5 h-5" />
                    <span>Upload File</span>
                </button>
            </div>

            <h2 className="text-gray-500 text-xs font-bold mt-10">Favorite Data Sources</h2>
            <ul className="space-y-2">
                {user ? (
                uploadedFiles.length !== 0 ? (
                    uploadedFiles.map((chart, index) => (
                        <li key={index}>
                            <h2 className="text-lg font-bold">{chart.fileName}</h2>
                        </li>
                    ))
                ) : (
                    <h1>No previously submitted charts.</h1>
                )
                ) : (
                <h1>Login or Signup to view previously uploaded charts!</h1>
                )}
            </ul>
        </nav>
        
        <div className="p-4">
            <button className="w-full bg-customBlue text-white py-2 rounded-xl flex items-center justify-center space-x-4">
                <FontAwesomeIcon icon={faSackDollar} className="w-5 h-5" />
                <span>Upgrade to Pro</span>
            </button>
        </div>
    </aside>
  )
}

export default SidebarComponent