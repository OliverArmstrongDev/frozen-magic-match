import './CheckBox.css'
import { useContext } from 'react';
import { MainContext } from '../contexts/GeneralContext';

export default function CheckBox({label, isChecked}) {
    const { state, actions, dispatch} = useContext(MainContext);


    const handleChange = () => {
        dispatch({type: actions.IS_CHECKED, payload: !state.isChecked})
      }

  return (
    <div className="cbox">
        <input type="checkbox" checked={state.isChecked} onChange={handleChange} id="checkA"/>
        <label htmlFor="checkA">{label}</label>
    </div>
  )
}