import SideBar from "../components/SideBar";
import { Button } from "../../../../../src/components/components/ui/button";
import { Send } from "lucide-react";

export default function Index() {
  return (
    <div className="mt-5 ml-5">
      <div className="flex h-full gap-x-5">
        {/* Chat List */}
        <SideBar />
        {/* Main Chat */}
        <main className="flex-1 flex flex-col bg-third rounded-xl">
          <header className="p-4 border-b border-muted-foreground flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-medium">Alice Crypto</h1>
            </div>
          </header>
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Messages */}
            <div className="flex gap-4 max-w-2xl">
              <img
                src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1737831467/abhiraj_tdwxdf.webp"
                alt="User"
                className="w-10 h-10 rounded-xl"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">ARK</span>
                  <span className="text-xs text-gray-400">09:20</span>
                </div>
                <div className="bg-primary rounded-xl p-4">
                  <p>
                    I added new flows to our design system. Now you can use them
                    for your projects!
                  </p>
                </div>
              </div>
            </div>
            {/* More messages */}
            <div className="flex gap-4 max-w-2xl ml-auto">
              <div className="flex-1">
                <div className="flex items-center justify-end gap-2 mb-1">
                  <span className="font-semibold">You</span>
                  <span className="text-xs text-gray-400">09:27</span>
                </div>
                <div className="bg-primary bg-opacity-70 rounded-xl p-4">
                  <p>
                    Abhi, my congratulations! I will be glad to work with you on
                    a new project 😊
                  </p>
                </div>
              </div>
              <img
                src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722161/AbhirajK/Abhirajk3.webp"
                alt="You"
                className="w-10 h-10 rounded-xl"
              />
            </div>
          </div>
          <footer className="p-4 border-t border-gray-800 flex gap-x-3 items-center">
            <div className="flex items-center gap-2 bg-primary rounded-xl w-full">
              <input
                type="text"
                placeholder="Your message"
                className="flex-1 bg-transparent focus:outline-none text-white placeholder-muted-foreground p-3 bg-primary"
              />
            </div>
            <Button
              className="bg-primary hover:bg-opacity-80 text-white h-full w-12"
              size="icon"
              type="submit"
            >
              <Send size={18} />
            </Button>
          </footer>
        </main>
      </div>
    </div>
  );
}
