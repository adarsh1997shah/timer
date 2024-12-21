import { Action, configureStore, createSlice, Middleware } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import { Timer } from "../types/timer";

const initialState = {
  timers: [] as Timer[]
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    addTimer: (state, action) => {
      state.timers.push({
        ...action.payload,
        isRunning: false,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        elapsedTime: 0
      });
    },
    deleteTimer: (state, action) => {
      state.timers = state.timers.filter((timer) => timer.id !== action.payload);
    },
    toggleTimer: (state, action) => {
      const timer = state.timers.find((timer) => timer.id === action.payload);

      if (timer) {
        timer.isRunning = !timer.isRunning;
      }
    },
    updateTimer: (state, action) => {
      const timer = state.timers.find((timer) => timer.id === action.payload.id);

      if (timer && timer.isRunning) {
        timer.remainingTime = action.payload.remainingTime;
        timer.elapsedTime = action.payload.elapsedTime;
        timer.isRunning = timer.remainingTime >= 0;
      }
    },
    restartTimer: (state, action) => {
      const timer = state.timers.find((timer) => timer.id === action.payload);

      if (timer) {
        timer.remainingTime = timer.duration;
        timer.isRunning = false;
        timer.elapsedTime = 0;
      }
    },
    editTimer: (state, action) => {
      const timer = state.timers.find((timer) => timer.id === action.payload.id);

      if (timer) {
        Object.assign(timer, action.payload.updates);
        timer.remainingTime = action.payload.updates.duration || timer.duration;
        timer.isRunning = false;
      }
    }
  }
});

const timerMiddleWare: Middleware = (store) => (next) => (action: unknown) => {
  const result = next(action);

  if ((action as Action).type.startsWith("timer/")) {
    localStorage.setItem("timer-data", JSON.stringify(store.getState().timers));
  }

  return result;
};

const getInitialStorageState = () => {
  const data = localStorage.getItem("timer-data");

  if (data) {
    return { timers: JSON.parse(data) || [] };
  }

  return { timers: [] };
};

const store = configureStore({
  reducer: timerSlice.reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(timerMiddleWare),
  preloadedState: getInitialStorageState()
});

export { store };

export const { addTimer, deleteTimer, toggleTimer, updateTimer, restartTimer, editTimer } =
  timerSlice.actions;

export const useTimerStore = () => {
  const dispatch = useDispatch();
  const timers = useSelector((state: { timers: Timer[] }) => state.timers);

  return {
    timers,
    addTimer: (timer: Omit<Timer, "id" | "createdAt" | "isRunning" | "elapsedTime">) =>
      dispatch(addTimer(timer)),
    deleteTimer: (id: string) => dispatch(deleteTimer(id)),
    toggleTimer: (id: string) => dispatch(toggleTimer(id)),
    updateTimer: (id: string, remainingTime: number, elapsedTime: number) =>
      dispatch(updateTimer({ id, remainingTime, elapsedTime })),
    restartTimer: (id: string) => dispatch(restartTimer(id)),
    editTimer: (id: string, updates: Partial<Timer>) => dispatch(editTimer({ id, updates }))
  };
};
