import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggler: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className={`theme-toggler ${theme === 'dark' ? 'dark' : 'light'}`} onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggler;
