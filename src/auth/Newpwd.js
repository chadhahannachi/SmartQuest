import React, { useState } from 'react';
import axios from 'axios';
import Background from '../Background';
import { Box, Button } from '@chakra-ui/react';
import logo from '../images/logo.png'; // Importez votre image
import { faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const Newpwd = () => {
    const [formData, setFormData] = useState({
        password: '',
        cpassword: ''
    });
    const [errors, setErrors] = useState({});
    const [valid, setValid] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isvalid = true;
        let validationErrors = {};

        if (!formData.password) {
            isvalid = false;
            validationErrors.password = 'Password required';
        } else if (formData.password.length < 6) {
            isvalid = false;
            validationErrors.password = 'Password length must be at least 6 characters';
        }

        if (!formData.cpassword) {
            isvalid = false;
            validationErrors.cpassword = 'Confirm Password required';
        } else if (formData.cpassword !== formData.password) {
            isvalid = false;
            validationErrors.cpassword = 'Passwords do not match';
        }

        if (!isvalid) {
            setErrors(validationErrors);
            setValid(isvalid);
            return;
        }

        try {
            const email = localStorage.getItem('resetEmail');
            if (!email) {
                alert("No email found for password reset");
                return;
            }

            const result = await axios.get('http://localhost:3030/users');
            const user = result.data.find(user => user.email === email);
            if (user) {
                await axios.put(`http://localhost:3030/users/${user.id}`, { ...user, password: formData.password });
                alert("Password reset successfully");
                navigate('/login');
            } else {
                alert("User not found");
            }
        } catch (err) {
            console.log(err);
            alert('Password reset failed');
        }
    };

    const imageStyle = {
        width: '100px', // Largeur de l'image (modifiable selon vos préférences)
        height: 'auto', // La hauteur s'ajuste automatiquement en fonction de la largeur
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
                            </div>
                            <form onSubmit={handleSubmit}>
                                {!valid && (
                                    <span className="text-danger">
                                        {errors.password && `${errors.password}; `}
                                        {errors.cpassword && `${errors.cpassword}; `}
                                    </span>
                                )}
                                <div className="row">
                                    <div className="mb-3 col-md-12" style={{ marginTop: '20px' }}>
                                        <label>New Password <span className="text-danger">*</span></label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Enter New Password"
                                            style={{ borderRadius: '50px' }}
                                            onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3 col-md-12" style={{ marginTop: '20px' }}>
                                        <label>Confirm New Password <span className="text-danger">*</span></label>
                                        <input
                                            type="password"
                                            name="cpassword"
                                            className="form-control"
                                            placeholder="Confirm New Password"
                                            style={{ borderRadius: '50px' }}
                                            onChange={(event) => setFormData({ ...formData, cpassword: event.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-12 text-center">
                                        <Button
                                            type="submit"
                                            style={{ backgroundColor: '#4D6466', borderRadius: '50px', color: 'white', fontWeight: '400' }}
                                        >
                                            <FontAwesomeIcon icon={faUnlockKeyhole} style={{ marginRight: '8px' }} />
                                            Change Password
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

export default Newpwd;
