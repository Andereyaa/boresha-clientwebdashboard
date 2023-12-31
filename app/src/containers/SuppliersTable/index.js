import React, {Component} from 'react'

import {connect} from "react-redux"

import DataTable from '../../components/DataTable'
import {capitalizeFirstLetterOfAllWords} from '../../utils/formatting'

export class SuppliersTable extends Component{

    static defaultProps = {
        errors: {}
    }
    
    render(){
        const {suppliersArray, errors, emptyText, tableTitle} = this.props
        if (!suppliersArray) return null
        return (
                <DataTable 
                    dataArray={suppliersArray}
                    title={tableTitle}
                    fields={['supplierName', 'phoneNumber', 'locationName']}
                    fieldTransformFunctions={{
                        supplierName: capitalizeFirstLetterOfAllWords,
                        locationName: capitalizeFirstLetterOfAllWords
                    }}
                    headings={{
                        supplierName: "Supplier Name",
                        locationName: "Address",
                        phoneNumber: "Phone Number"
                    }}
                    errors={errors}
                    emptyText={emptyText ? emptyText : undefined}
                />
        )
    }
}

const mapStateToProps = state => ({
    suppliers: state.suppliers
});


export default connect(mapStateToProps)(SuppliersTable)