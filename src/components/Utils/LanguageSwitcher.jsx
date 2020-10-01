import React, { Fragment } from 'react';
import i18n from "i18next";
import {getLangNameFromCode} from 'language-name-map'

const LanguageSwitcher = () => {

    const changeLanguage=(e)=>{
       i18n.changeLanguage(e.target.value)
    }
    // I hate to hand code it this way.looping the options via i18n doesnot seem to work
    return(
        <Fragment>    
            <select  onClick={(e) => changeLanguage(e)}>
                <option value='en'>{getLangNameFromCode('en').native}</option>
                <option value='fr'>{getLangNameFromCode('fr').native}</option>
            </select>
        </Fragment>
    )
}
export default LanguageSwitcher;
