import { useContext } from 'react';
import { MainContext } from '../contexts/GeneralContext';
import { useTheme } from '../hooks/useTheme';
import Button from './Button';
//styles
import './Header.css';
////      ////



function Header() {
  const {logoImg} = useContext(MainContext);

  return (
    <div className='logo-div'>
    <img className='logo' src={logoImg} alt="frozen logo" />
    <h2 className='font-face-ik magic'>Magic Match!</h2>
      <div>
        <Button/>
      </div>
    </div>
  )
}

export default Header