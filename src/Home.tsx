import { useState } from "react";
import { Plus, Clock } from "lucide-react";
import { Toaster } from "sonner";

import useMobile from "./common/hooks/useMobile";
import Button from "./common/components/button/button";

import { TimerList } from "./components/TimerList";
import { AddTimerModal } from "./components/AddTimerModal";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isMobile = useMobile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position={isMobile ? "bottom-right" : "top-right"} />

      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-blue-600" />

            <h1 className="text-3xl font-bold text-gray-900">Timer</h1>
          </div>

          <Button
            className="shadow-md hover:shadow-lg"
            Icon={<Plus className="w-5 h-5" />}
            onClick={() => setIsModalOpen(true)}
          >
            Add Timer
          </Button>
        </div>

        <TimerList />

        <AddTimerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
}

export default Home;
