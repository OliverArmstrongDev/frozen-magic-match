import './ThemeSelector.css'
import { useTheme } from '../hooks/useTheme'
import Header from './Header';
import { useContext } from 'react';
import { MainContext } from '../contexts/GeneralContext';

const themeColors =['#00d1f6', '#f32be2', '#18a1ed','#e9f001', '#e90000', '#a82fac'];


export default function ThemeSelector() {

   
    const {setColor} = useContext(MainContext);

  return (
    <> 
    <div className='theme-selector'>
        <div className="theme-buttons">
          <h1 className='font-face-ik'>Change Background Colour</h1>
        {themeColors.map(color => (
            <div key={color}
            onClick={()=> setColor(color)}
            style={{background: color}}
            />
        ))}
        </div>
    </div>
    </>
  )
}
