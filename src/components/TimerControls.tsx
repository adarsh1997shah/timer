import React from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

import IconButton from "../common/components/button/IconButton";

interface TimerControlsProps {
  isRunning: boolean;
  remainingTime: number;
  onToggle: () => void;
  onRestart: () => void;
}

export const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  remainingTime,
  onToggle,
  onRestart
}) => {
  const isCompleted = remainingTime <= 0;

  if (isCompleted) {
    return (
      <IconButton
        title="Restart Timer"
        Icon={<RotateCcw className="w-6 h-6" />}
        withBackground
        onClick={onRestart}
        variant="info"
      />
    );
  } else if (isRunning) {
    return (
      <IconButton
        title="Pause Timer"
        Icon={<Pause className="w-6 h-6" />}
        withBackground
        onClick={onToggle}
        variant="danger"
      />
    );
  }

  return (
    <IconButton
      title="Start Timer"
      Icon={<Play className="w-6 h-6" />}
      withBackground
      onClick={onToggle}
      variant="success"
    />
  );
};
