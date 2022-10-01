import React from 'react';
import Navbar from '../navbar';
import './index.css'
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};
const validPhoneNumber = RegExp(/^[6-9]{1}[0-9]{9}$/);
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: null,
      email: null,
      password: null,
      phoneNumber: null,
      errors: {
        fullName: '',
        email: '',
        password: '',
        phoneNumber: ''
      }
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'fullName':
        errors.fullName =
          value.length < 5
            ? 'Full Name must be at least 5 characters long!'
            : '';
        break;
      case 'email':
        errors.email =
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'phoneNumber':
        errors.phoneNumber = validPhoneNumber.test(value) ? '' : 'Phone number is not valid!';
        break;

      case 'password':
        errors.password =
          value.length < 8
            ? 'Password must be at least 8 characters long!'
            : '';
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm(this.state.errors)) {
      try {
      
        await localStorage.setItem("user", JSON.stringify({
          fullName: this.state.fullName,
          email: this.state.email,
          password: this.state.password,
          phoneNumber: this.state.phoneNumber,
        }));
        
        console.log("register==",await JSON.parse(localStorage.getItem("user")))
        this.setState({
          fullName: null,
          email: null,
          password: null,
          phoneNumber: null,
          errors: {
            fullName: '',
            email: '',
            password: '',
            phoneNumber: ''
          }
        })
        event.target.reset();
        alert("Registered Successfully")
      } catch (error) {
        console.log("local storage set item error", error)
      }
    } else {
      console.error('Invalid Form')
    }
  }

  render() {
    const { errors,fullName,phoneNumber,email,password } = this.state;
    return (
        
        <div className='register-conatainer'>
        <Navbar />
          <h2>Create Account</h2>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className='fullName'>
              <label htmlFor="fullName">Full Name</label>
              <br />
              <input type='text' name='fullName' onChange={this.handleChange} value={fullName} noValidate />
              <br />
              {errors.fullName.length > 0 &&
                <span className='error'>{errors.fullName}</span>}
            </div>
            <div className='phoneNumber'>
              <label htmlFor="phoneNumber">Phone Number</label>
              <br />
              <input type='number' name='phoneNumber' onChange={this.handleChange}  value={phoneNumber} noValidate />
              <br />
              {errors.phoneNumber.length > 0 &&
                <span className='error'>{errors.phoneNumber}</span>}
            </div>
            <div className='email'>
              <label htmlFor="email">Email</label>
              <br />
              <input type='email' name='email' onChange={this.handleChange} value={email} noValidate />
              <br />
              {errors.email.length > 0 &&
                <span className='error'>{errors.email}</span>}
            </div>
            <div className='password'>
              <label htmlFor="password">Password</label>
              <br />
              <input type='password' name='password' onChange={this.handleChange} value={password} noValidate />
              <br />
              {errors.password.length > 0 &&
                <span className='error'>{errors.password}</span>}
            </div>
            <div className='submit'>
              <button> Register</button>
            </div>
          </form>
        
      </div>
    );
  }
}