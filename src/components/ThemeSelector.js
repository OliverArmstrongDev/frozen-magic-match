import './ThemeSelector.css'
import { useTheme } from '../hooks/useTheme'
import Header from './Header';
import { useContext } from 'react';
import { MainContext } from '../contexts/GeneralContext';




export default function ThemeSelector() {

   
    const {changeColor, themeColors} = useContext(MainContext);

  
  return (
    <> 
    <div className='theme-selector'>
        <div className="theme-buttons">
          <h1 className='font-face-ik'>Change Background Colour</h1>
        {themeColors.map(color => (
        <div key={color}
            onClick={()=> changeColor(color)}
            style={{background: color}}
            />
  ))} 
        </div>
    </div>
    </>
  )
}
