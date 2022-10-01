import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar';
import './index.css'
const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};
export  const WrapperLogin = () => {
    let navigate =useNavigate()
    return  <Login navigate = {navigate} />
}
 class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registeredUser: null,
            fullName: null,
            password: null,
            errors: {
                fullName: '',
                password: '',

            }
        };
    }
    componentDidMount() {
        this.getUserDetails()
    }
    getUserDetails = async () => {
        try {
            let registeredUser = await JSON.parse(localStorage.getItem('user'));
            console.log("registeredUser login=", registeredUser);
            if (registeredUser) {
                this.setState({ registeredUser: registeredUser })
            }
        } catch (error) {
            console.log("not able to get user", error)
        }
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

    handleSubmit = (event) => {
        event.preventDefault();
        let { fullName, email, phoneNumber, password, registeredUser } = this.state;
        console.log("submit login")
        if (validateForm(this.state.errors) && fullName == registeredUser.fullName && password == registeredUser.password) {
            this.props.navigate('/');
        } else {
            console.error('User not registered')
        }
    }

    render() {
        const { errors } = this.state;
        return (
                <div className='login-container'>
                <Navbar/>
                <h2>Login</h2>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className='fullName'>
                            <label htmlFor="fullName">Full Name</label>
                            <br/>
                            <input type='text' name='fullName' onChange={this.handleChange} noValidate />
                            <br/>
                            {errors.fullName.length > 0 &&
                                <span className='error'>{errors.fullName}</span>}
                        </div>
                        <div className='password'>
                            <label htmlFor="password">Password</label>
                            <br/>
                            <input type='password' name='password' onChange={this.handleChange} noValidate />
                            <br/>
                            {errors.password.length > 0 &&
                                <span className='error'>{errors.password}</span>}
                        </div>
                        <div className='submit'>
                            <button>Login</button>
                        </div>
                    </form>
                </div>
        
        );
    }
}
