import React, { useEffect, useRef, useState } from "react";
import { Trash2, RotateCcw, Pencil } from "lucide-react";
import { toast } from "sonner";

import IconButton from "../common/components/button/IconButton";

import { Timer } from "../types/timer";

import { useTimerStore } from "../store/useTimerStore";

import { formatTime } from "../utils/time";
import { TimerAudio } from "../utils/audio";

import { TimerControls } from "./TimerControls";
import { TimerProgress } from "./TimerProgress";
import { AddEditTimerModal } from "./AddEditTimerModal";

interface TimerItemProps {
  timer: Timer;
}

const timerAudio = TimerAudio.getInstance();

export const TimerItem: React.FC<TimerItemProps> = ({ timer }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const reqAnimationRef = useRef<number | null>(null);

  const { toggleTimer, deleteTimer, updateTimer, restartTimer } = useTimerStore();

  useEffect(() => {
    const startTime = Date.now() - timer.elapsedTime * 1000;

    const updateProgress = () => {
      const elapsedTime = (Date.now() - startTime) / 1000; // Convert to seconds
      const remainingTime = Math.max(timer.duration - elapsedTime, 0);

      updateTimer(timer.id, remainingTime, elapsedTime);

      if (remainingTime > 0) {
        reqAnimationRef.current = requestAnimationFrame(updateProgress); // Recursive call
      }
    };

    if (timer.isRunning) {
      reqAnimationRef.current = requestAnimationFrame(updateProgress);
    }

    return () => cancelAnimationFrame(reqAnimationRef.current!);
  }, [timer.isRunning, timer.id]);

  useEffect(() => {
    if (timer.remainingTime <= 0) {
      timerAudio.play().catch(console.error);

      toast.success(`Timer "${timer.title}" has ended!`, {
        duration: 5000,
        onAutoClose: timerAudio.stop.bind(timerAudio),
        action: {
          label: "Dismiss",
          onClick: timerAudio.stop.bind(timerAudio)
        }
      });
    }
  }, [timer.remainingTime, timer.title]);

  const handleRestart = () => {
    restartTimer(timer.id);
  };

  const handleDelete = () => {
    timerAudio.stop();

    deleteTimer(timer.id);
  };

  const handleToggle = () => {
    toggleTimer(timer.id);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6 transition-transform hover:scale-102 overflow-hidden">
        <div className="flex justify-between items-start mb-4">
          <div className="overflow-hidden">
            <h3
              className="text-xl font-semibold text-gray-800 whitespace-nowrap text-ellipsis overflow-hidden"
              title={timer.title}
            >
              {timer.title}
            </h3>
            {timer.description ? <p className="text-gray-600 mt-1">{timer.description}</p> : null}
          </div>
          <div className="flex gap-2">
            <IconButton
              title="Edit Timer"
              onClick={() => setIsEditModalOpen(true)}
              variant="info"
              Icon={<Pencil className="w-5 h-5" />}
            />

            <IconButton
              title="Restart Timer"
              onClick={handleRestart}
              variant="info"
              Icon={<RotateCcw className="w-5 h-5" />}
            />

            <IconButton
              title="Delete Timer"
              onClick={handleDelete}
              variant="danger"
              Icon={<Trash2 className="w-5 h-5" />}
            />
          </div>
        </div>
        <div className="flex flex-col items-center mt-6">
          <div className="text-4xl font-mono font-bold text-gray-800 mb-4">
            {formatTime(Math.ceil(timer.remainingTime))}
          </div>

          <TimerProgress progress={(timer.remainingTime / timer.duration) * 100} />

          <TimerControls
            isRunning={timer.isRunning}
            remainingTime={timer.remainingTime}
            onToggle={handleToggle}
            onRestart={handleRestart}
          />
        </div>
      </div>

      <AddEditTimerModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} timer={timer} />
    </>
  );
};
