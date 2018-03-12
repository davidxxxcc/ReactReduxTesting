import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';



class Signin extends Component {
    renderInput(field)  {
        const { meta : { touched, error }} = field;
        const className =`form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div>
                <input {...field.input} type={field.type}/>
                {
                    touched &&
                    error &&
                    <span className="error">{error}</span>
                }
            </div>
        );
    }

    handleFormSubmit({ email, password }) {
        // const {email, password } = this.props;
        console.log(email, password);
        // need something to log user in
        this.props.signinUser({ email, password });
        // if(!this.props.errorMessage) {
        //     this.renderAlert();
        // }
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> { this.props.errorMessage}
                </div>
            );
        } 
    }


    render() {
        const { handleSubmit } = this.props; 
        return (
            <form
                className="ui form"
                onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
            >
                <div className="field">
                    <label>Email:</label>
                    <Field
                        name="email"                            // Specify field name
                        component={this.renderInput}        // Specify render component above
                        type="email"                            // Specify "type" prop passed to renderInput
                    />
                    {/* <input {...email} placeholder="john.doe@example.com" type="email" /> */}
                </div>
                <div className="field">
                    <label>Password:</label>
                    <Field
                        name="password"                        // Specify field name
                        component={this.renderInput}        // Specify render component above
                        type="password"                        // Specify "type" prop passed to renderInput
                    />
                    {/* <input {...password} placeholder="password" type="password" /> */}
                </div>
                {this.renderAlert()}
                <button action="submit" className="ui inverted blue button ">
                    Sign in
                </button>
            </form>
        );
    }
}


function mapStateToProps(state) {
    // console.log(state);
    return { errorMessage:  state.auth.error };
}

export default reduxForm({
    form: 'signin',    // no fields array given
})(
    connect(mapStateToProps, actions)(Signin)
);
