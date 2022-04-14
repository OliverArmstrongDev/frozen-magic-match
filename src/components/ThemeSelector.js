import './ThemeSelector.css'
import { useTheme } from '../hooks/useTheme'
import Header from './Header';
import { useContext } from 'react';
import { MainContext } from '../contexts/GeneralContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useFirestore } from '../hooks/useFirestore';






export default function ThemeSelector() {
  const { addDocument, updateColorDocument, response } = useFirestore('GameColor');
    const {changeColor, themeColors} = useContext(MainContext);
    const {user} = useAuthContext();



    const saveBGColor2DB = (color) => {
     if(user){
        updateColorDocument({
            uid: user.uid,
            BGColour: color
          })
          return;
        }
         changeColor(color, true)
    }
  
  return (
    <> 
    <div className='theme-selector'>
      <div className="theme-buttons">
          <h1 className='font-face-ik'>Change Background Colour</h1>
          {themeColors.map(color => (
            <div key={color}
                onClick={()=> saveBGColor2DB(color)}
                style={{background: color}}
                />
                ))} 
        </div>
    </div>
    </>
  )
}
