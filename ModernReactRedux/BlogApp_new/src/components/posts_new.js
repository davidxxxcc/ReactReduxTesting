import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
    renderField(field) {
        const { meta : { touched, error }} = field;
        const className =`form-group ${touched && error ? 'has-danger' : ''}`;


        return (
            <div className={ className }>
                <label>{field.label}</label>
                <input
                    className="for-controal"
                    type="text"
                    { ...field.input}
                />
                {touched ? error : ''}
            </div>
        );
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }


    render() {
        const { handleSubmit } = this.props;

        return (
         <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
             <Field
                label="Title For Post"
                name="title"
                component={ this.renderField}
             />

              <Field
                label="Catergories"
                name="catergories"
                component={ this.renderField}
             />

              <Field
                label="Posts Content"
                name="content"
                component={ this.renderField}
             />
             <button type="submit" className="btn btn-primary">Submit</button>
             <Link to="/" className="btn btn-danger">Cancel</Link>
         </form>
        );
    }
}

function validate(values) {
    // console.log(values) -> { title:'asdfsa', catergories: 'sadfdsf', content: 'sdfdsf'}
    const errors ={};

    //  Validate the inputs from 'values'
    if (!values.title ) {
        errors.title ="Enter a title!";
    }
    if (!values.catergories) {
        errors.catergories ="Enter some categories!";
    }
    if (!values.content) {
        errors.content ="Enter some content please!";
    }

    // if error has *any* properties, redux form assumes form is invalid
    // if errors is empty, the form is fine to submit
    return errors;
}

export default reduxForm({
    validate: validate,
    form: 'PostsNewForm' 
})(
   connect(null, { createPost }) (PostsNew)
);