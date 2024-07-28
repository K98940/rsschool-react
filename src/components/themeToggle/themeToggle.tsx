import { useContext } from 'react';
import classes from './themeToggle.module.css';
import { themeContext } from '@/context/themeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(themeContext);

  return (
    <div className={classes.container}>
      <button
        className={`button ${classes.buttonThemeToggle} ${theme === 'dark' ? classes.buttonDarkMode : ''}`}
        data-testid="button-theme-toggle"
        onClick={toggleTheme}
      ></button>
    </div>
  );
};

export { ThemeToggle };
