import React from "react";
import { useChatStore } from "../store/useChatStore";
import SideBar from "../components/SideBar";
import NoChatPage from "../components/NoChatPage";
import ChatPage from "../components/ChatPage";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-lg w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <SideBar />
            {selectedUser ? <ChatPage /> : <NoChatPage />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
