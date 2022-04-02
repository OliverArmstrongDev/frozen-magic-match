import './ThemeSelector.css'
import { useTheme } from '../hooks/useTheme'

const themeColors =['#00d1f6', '#f32be2', '#18a1ed','#e9f001', '#e90000', '#a82fac'];


export default function ThemeSelector() {

    const {changeColor} = useTheme();

  return (
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
  )
}
