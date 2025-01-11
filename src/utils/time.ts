export const formatTime = (seconds: number): { text: string; remainingSeconds: number } => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const pad = (num: number): string => num.toString().padStart(2, "0");

  if (hours > 0) {
    return { text: `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`, remainingSeconds };
  }

  return { text: `${pad(minutes)}:${pad(remainingSeconds)}`, remainingSeconds };
};
