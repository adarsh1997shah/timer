import { Action } from "redux";

export interface Timer {
  id: string;
  title: string;
  description: string;
  duration: number; // in seconds
  remainingTime: number;
  isRunning: boolean;
  createdAt: number;
}

export interface TimerAction extends Action<string> {
  payload?: any;
}
