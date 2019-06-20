import React from 'react'

import styles from './SuppliersTableRow.module.css'

import SuppliersTableCell from '../SuppliersTableCell'
import {capitalizeFirstLetterOfAllWords} from '../../utils/formatting'

export default ({supplier, even=false}) => {
    if (!supplier) return null
    const evenStyle = even ? styles.even : ""
    return (
        <div className={[styles.container, evenStyle].join(" ")}>
            <SuppliersTableCell value={capitalizeFirstLetterOfAllWords(supplier.supplierName)}/>
            <SuppliersTableCell value={supplier.phoneNumber}/>
            <SuppliersTableCell value={capitalizeFirstLetterOfAllWords(supplier.locationName)}/>
        </div>
    )
}