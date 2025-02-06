"use client";
import { useEffect, useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import SidebarComponent from "../components/SidebarComponent";
import UploadFileComponent from "../components/UploadFileComponent";
import { useAuth } from "@/context/AuthContext";
import { fetchUploadedData } from "@/api/api";

interface ChartData {
  fileName: string;
  created_at: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
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
    <div className="flex h-screen bg-white">
      <SidebarComponent setIsOpen={setIsOpen} isOpen={isOpen} setShowUpload={setShowUpload} />

      <div className="flex-1 flex flex-col border">
        <HeaderComponent setIsOpen={setIsOpen}/>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
            Let’s collect all your <span className="text-customBlue">data</span> in one place!
          </h2>
          <div>
            <p className="text-gray-700">Charts</p>
            <div className="grid grid-cols-3 gap-4">
              {/* Insert charts here */}
            </div>
          </div>

          <div>
            <p className="text-gray-700">Previous Charts</p>
            {user ? (
              uploadedFiles.length !== 0 ? (
                <div className="mt-6 grid grid-cols-3 gap-4">
                  {uploadedFiles.map((chart, index) => (
                            <div key={index} className="border p-4 rounded-md">
                                <h2 className="text-lg font-bold">{chart.fileName}</h2>
                                <p className="text-gray-500">Uploaded: {new Date(chart.created_at).toLocaleDateString()}</p>
                            </div>
                        ))}
                </div>
              ) : (
                <h1>No previously submitted charts.</h1>
              )
            ) : (
              <h1>Login or Signup to view previously uploaded charts!</h1>
            )}
          </div>
        </main>
        <UploadFileComponent showUpload={showUpload} setShowUpload={setShowUpload}/>
      </div>
    </div>
  );
}
