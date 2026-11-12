import React from "react";
import clsx from "clsx";
import { useTheme } from "../context/ThemeContext";

interface GameLayoutProps {
  headerSlot: React.ReactNode;
  statusSlot: React.ReactNode;
  timerSlot: React.ReactNode;
  boardSlot: React.ReactNode;
  controlsSlot: React.ReactNode;
}

export const GameLayout: React.FC<GameLayoutProps> = ({
  headerSlot,
  statusSlot,
  timerSlot,
  boardSlot,
  controlsSlot,
}) => {
  const { theme } = useTheme();

  return (
    <div className={clsx("game", theme === "dark" && "dark")}>
      <div className="game-panel">
        <span className="hud-corner-tr" aria-hidden="true" />
        <span className="hud-corner-bl" aria-hidden="true" />
        {headerSlot}
        {statusSlot}
        {timerSlot}
        {boardSlot}
        {controlsSlot}
      </div>
    </div>
  );
};
