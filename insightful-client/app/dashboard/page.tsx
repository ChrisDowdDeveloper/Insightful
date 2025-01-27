"use client";
import { useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import SidebarComponent from "../components/SidebarComponent";
import UploadFileComponent from "../components/UploadFileComponent";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

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
            <div className="mt-6 grid grid-cols-3 gap-4">
              {/* Insert previous charts here */}
            </div>
          </div>
        </main>
        <UploadFileComponent showUpload={showUpload} setShowUpload={setShowUpload}/>
      </div>
    </div>
  );
}
