import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export const useTheme = () => {
    const context = useContext(ThemeContext); //returns color: 'red'

    if(context === undefined){
        throw new Error('useTheme must be wrapped with ThemeContext!)');
    }
    return context;
}