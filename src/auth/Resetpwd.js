import React, { useState } from 'react';
import axios from 'axios';
import Background from '../Background';
import { Box, Button } from '@chakra-ui/react';
import logo from '../images/logo.png'; // Importez votre image
import { faCircleExclamation, faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const Resetpwd = () => {
    const [formData, setFormData] = useState({ email: '' });
    const [errors, setErrors] = useState({});
    const [valid, setValid] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isvalid = true;
        let validationErrors = {};

        if (!formData.email) {
            isvalid = false;
            validationErrors.email = 'Email required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            isvalid = false;
            validationErrors.email = 'Email is not valid';
        }

        if (!isvalid) {
            setErrors(validationErrors);
            setValid(isvalid);
            return;
        }

        try {
            const result = await axios.get('http://localhost:3030/users');
            const user = result.data.find(user => user.email === formData.email);
            if (user) {
                localStorage.setItem('resetEmail', formData.email);
                navigate('/newpwd');
            } else {
                alert("Email not found");
            }
        } catch (err) {
            console.log(err);
            alert('Password reset failed');
        }
    };

    const imageStyle = {
        width: '100px',
        height: 'auto',
        margin: '35px auto 35px',
        marginBottom: '5px'
    };

    return (
        <div>
            <Background />
            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="signup-form">
                            <div style={{ textAlign: 'center' }}>
                                <img src={logo} alt="Home" style={imageStyle} />
                                <h4 style={{ fontWeight: 'bold', fontSize: '20px', margin: '10px 0' }}>Reset Password</h4>
                                <p style={{ fontSize: '13px', margin: '10px 0', color: '#686868' }}>
                                    <FontAwesomeIcon icon={faCircleExclamation} style={{ marginRight: '8px' }} />
                                    Recover your password by entering your email
                                </p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                {!valid && (
                                    <span className="text-danger">
                                        {errors.email && `${errors.email}; `}
                                    </span>
                                )}
                                <div className="row">
                                    <div className="mb-3 col-md-12" style={{ marginTop: '20px' }}>
                                        <label>Email <span className="text-danger">*</span></label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Enter Email"
                                            style={{ borderRadius: '50px' }}
                                            onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-12 text-center">
                                        <Button
                                            type="submit"
                                            style={{ backgroundColor: '#4D6466', borderRadius: '50px', color: 'white', fontWeight: '400' }}
                                        >
                                            <FontAwesomeIcon icon={faUnlockKeyhole} style={{ marginRight: '8px' }} />
                                            Recover Password
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resetpwd;
