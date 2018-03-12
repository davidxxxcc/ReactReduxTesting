import React, { Component } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

const renderInput = ({ label, type, ...field, meta: { touched, error, warning } }) => {
    return (
        <fieldset className="form-group">
            <label>{label}:</label>
            <input {...field.input} type={type} className="form-control" />
            {touched && error && <span className="error">{error}</span>}
        </fieldset>
    )
}
class Signup extends Component {
    // constructor(props) {
    //     super(props)
    // }
    handleFormSubmit( {email, password, passwordConfirm} ) {
        // this.props.signupUser(values);
        // console.log(values);
        this.props.signupUser({email, password, passwordConfirm} );
    }

    renderAlert() {
        if(this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> { this.props.errorMessage }
                </div>
            )
        }  
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field name="email" component={renderInput} type="text" label="Email" />
                <Field name="password" type="password" component={renderInput} label="Password" />
                <Field name="passwordConfirm" type="password" component={renderInput} label="Confirm Password" />
                {this.renderAlert()}
                <button className="btn btn-primary" type="submit">
                    Sign up!
                </button>
            </form>
        )
    }
}
function validate(formProps) {
    const errors = {};

    if (!formProps.email) errors.email = 'Please enter an email';
    if (!formProps.password) errors.password = 'Please enter an password';
    if (!formProps.passwordConfirm) errors.passwordConfirm = 'Please enter an passwordConfirm';
    if (formProps.password != formProps.passwordConfirm) {
        errors.password = 'Passwords must match!';
    }
    return errors;
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
})(
    connect(mapStateToProps, actions)(Signup)
);