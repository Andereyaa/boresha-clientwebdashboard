import React, {Component} from 'react'
import styles from './LoginForm.module.css'
import FormField from '../../components/FormField'
import PhoneField from '../PhoneField'

import LogoTitle from '../../components/LogoTitle'
import RoundedButton from '../../components/RoundedButton'
import Link from '../../components/Link'
import PropTypes from 'prop-types';

//form validation
import {fieldValueIsNotBlank} from '../../utils/formValidation'
import {verifyPhoneNumber} from '../../utils/phoneNumberHandling'
import {BLANK_USER_ID, BLANK_PASSWORD, INVALID_PHONE_NUMBER} from '../../constants/errors'

import {connect} from 'react-redux'

export class LoginForm extends Component {

    constructor(props){
        super(props)
        const {countries} = props
        const defaultCountryId = countries && countries.defaultCountryId ? countries.defaultCountryId : "ug"
        this.state = {
            phoneNumber: "",
            countryId: defaultCountryId,
            password: "",
            errors: {}
        }
    }

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    }
    
    handleChange = (value, name) => {
        if (!name && (name !== 0)) throw new Error('Cannot update state, no name value specified')
        else if (!(name in this.state)) throw new Error(`The name "${name}" is not a key in state`) 
        else{
            this.setState({[name]: value, errors:{}})
        }
    }

    handleChangeCountry = countryId => {
        if (!countryId) return
        this.setState({ countryId })
    }

    handleSubmit = () =>{
        if(this.validate()){
            const {phoneNumber, password, countryId} = this.state
            const {onSubmit} = this.props
            if (!onSubmit) throw new Error('No onSubmit function provided')
            else {
                const {countries} = this.props
                const country = countries.countriesById[countryId]
                const verifiedFullPhoneNumber = `${country.dialingCode}${verifyPhoneNumber(phoneNumber, country)}`
                const userId = this.getUserId(verifiedFullPhoneNumber)
                onSubmit(userId, password)
            }
        }
    }

    getUserId = baseUserId => {
        //TODO expand to deal with email case
        return `${baseUserId}@boresha.tech`
    }

    validate = () => {
        const {phoneNumber, password, countryId} = this.state
        const errors = {
            phoneNumber: null,
            password: null
        }
        if (!fieldValueIsNotBlank(phoneNumber)) errors.phoneNumber = BLANK_USER_ID
        if (!fieldValueIsNotBlank(password)) errors.password = BLANK_PASSWORD
        const {countries} = this.props
        const country = countries.countriesById[countryId]
        if (!errors.phoneNumber && !verifyPhoneNumber(phoneNumber, country)) errors.phoneNumber = INVALID_PHONE_NUMBER
        if (Object.values(errors).every(error => !error)) return true
        else {
            this.setState({errors})
            return false
        }
    }

    handleForgotPassword = () => alert("Please contact the Boresha Team via your Whatsapp Support Group to get a reminder")
    render (){
        const {phoneNumber, password, errors, countryId} = this.state 
        const {countries} = this.props
        if (!countries) return null
        return (
            <div className={styles.container}>
                <LogoTitle title="Boresha Dashboard"/>
                <div className={styles.fields}>
                    <PhoneField 
                        error={errors.phoneNumber}
                        label='Phone Number' 
                        name="phoneNumber"
                        value={phoneNumber}
                        onChangePhoneNumber={this.handleChange}
                        onChangeCountry={this.handleChangeCountry}
                        includedCountryIds={countries.countryIds}
                        countryId={countryId}
                    />
                    <FormField 
                        error={errors.password}
                        label='Password' 
                        icon='lock'
                        type='password'
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                        onEnterPress={this.handleSubmit}
                    />
                    <div className={styles.buttonContainer}>
                    <RoundedButton 
                        text="Login"
                        onClick={this.handleSubmit}
                    />
                    </div>
                </div>
                <Link text="Forgot your password?" onClick={this.handleForgotPassword}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    countries: state.countries
})

export default connect (mapStateToProps)(LoginForm)