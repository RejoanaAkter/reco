"use client";
import { Timer } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  RiTimerFill,
  RiPauseFill,
  RiPlayFill,
  RiRestartFill,
} from "react-icons/ri";

export const RecipeTimer = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="bg-white rounded px-6 py-2 shadow-lg border">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-amber-50 border rounded flex items-center justify-center">
          <Timer size={16} className="text-amber-700" />
        </div>
        <div>
          <h2 className="text-[16px] font-semibold text-gray-800">
            Cooking Timer
          </h2>
          <p className="text-xs text-amber-600 tracking-[0.1em]">
            Set timers for perfect cooking
          </p>
        </div>
      </div>
      <div className="text-center mb-6">
        <div className="text-4xl font-mono font-bold text-gray-800 mb-2">
          {formatTime(time)}
        </div>
        <p className="text-gray-500 text-sm">Current timer</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
            isActive
              ? "bg-orange-500 hover:bg-orange-600 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {isActive ? (
            <RiPauseFill className="inline mr-2" />
          ) : (
            <RiPlayFill className="inline mr-2" />
          )}
          {isActive ? "Pause" : "Start"}
        </button>

        <button
          onClick={() => {
            setIsActive(false);
            setTime(0);
          }}
          className="flex-1 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
        >
          <RiRestartFill className="inline mr-2" />
          Reset
        </button>
      </div>
    </div>
  );
};
