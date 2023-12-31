import React from 'react'
import styles from './Icon.module.css'

import ArrowBack from '@material-ui/icons/ArrowBack'
import ArrowDrowDown from '@material-ui/icons/ArrowDropDown'
import ArrowDrowUp from '@material-ui/icons/ArrowDropUp'
import Business from '@material-ui/icons/Business'
import DonutSmall from '@material-ui/icons/DonutSmall'
import Group from '@material-ui/icons/Group'
import Lock from '@material-ui/icons/Lock'
import Menu from '@material-ui/icons/Menu'
import Person from '@material-ui/icons/Person'
import Phone from '@material-ui/icons/Phone'


/**
 * Documentation here: https://www.npmjs.com/package/@material-ui/icons
 * 
 * Note: This component uses a switch statement to determine which icon to display
 * 
 * Important:
 *     :  If the icon you want is not imported above^, import it using the 
 *     :  currently used import style `import IconName from '@material-ui/icons/DonutSmall'`
 *     :  in the style `import {IconName} from '@material-ui/icons'` will load all available icons
 *     :  into the software and bloat the program 
 * 
 */

export default ({icon="donut-small", customStyles={}}) => {
    icon = icon.toLowerCase()
    let SelectedIcon = DonutSmall
    switch (icon) {
        case 'arrow-back': SelectedIcon = ArrowBack; break;
        case 'arrow-drop-down' : SelectedIcon = ArrowDrowDown; break;
        case 'arrow-drop-up' : SelectedIcon = ArrowDrowUp; break;
        case 'business': SelectedIcon = Business; break;
        case 'donut-small' : SelectedIcon = DonutSmall; break;
        case 'group' : SelectedIcon = Group; break;
        case 'lock' : SelectedIcon = Lock; break;
        case 'menu' : SelectedIcon = Menu; break;
        case 'person' : SelectedIcon = Person; break;
        case 'phone' : SelectedIcon = Phone; break;
        default: SelectedIcon = DonutSmall
    }
    return (
        <SelectedIcon style={customStyles} className={styles.container}/>
    )
}