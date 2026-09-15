import { RegisterForm } from './components/RegisterForm';
import ThemeToggler from './components/ThemeToggler';
import { useTheme } from './context/ThemeContext';

function App() {
  const { theme } = useTheme();

  return (
    <div className={`app-container ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      <ThemeToggler />
      <RegisterForm />
    </div>
  );
}

export default App;