import React, {Fragment} from 'react'
import styles from './MenuItem.module.css'

import Icon from '../Icon'
import {capitalizeFirstLetterOfAllWords} from '../../utils/formatting'

import { Link } from 'react-router-dom';

export default ({text="", icon="", pathname, onClick, selected=false, afterClick=()=>{}}) => {
    const containerStyle = selected ? `${styles.container} ${styles.selected}` : styles.container
    return (
        <Fragment>
            {
                onClick ?

                <div className={containerStyle} onClick={() => {onClick(); afterClick()}}>
                    <Icon icon={icon} />
                    <span className={styles.text}>{capitalizeFirstLetterOfAllWords(text)}</span>
                </div>

                :
                <Link 
                    className={containerStyle}
                    to={{pathname}}
                    onClick={afterClick}
                >
                    <Icon icon={icon} />
                    <span className={styles.text}>{capitalizeFirstLetterOfAllWords(text)}</span>
                </Link>
            }
        </Fragment>
    )
}