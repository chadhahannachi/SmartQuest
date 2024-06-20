import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Background from "../Background";
import { Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../images/logo.png'; // Importez votre image
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [valid, setValid] = useState(true);
    const navigate = useNavigate();

    const imageStyle = {
        width: '100px', // Largeur de l'image (modifiable selon vos préférences)
        height: 'auto', // La hauteur s'ajuste automatiquement en fonction de la largeur
        margin: '35px auto 35px',
        marginBottom: '5px'
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isvalid = true;
        let validationErrors = {};

        if (!formData.email) {
            isvalid = false;
            validationErrors.email = "Email required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            isvalid = false;
            validationErrors.email = "Email is not valid";
        }

        if (!formData.password) {
            isvalid = false;
            validationErrors.password = "Password required";
        } else if (formData.password.length < 6) {
            isvalid = false;
            validationErrors.password = "Password length must be at least 6 characters";
        }

        if (!isvalid) {
            setErrors(validationErrors);
            setValid(isvalid);
            return;
        }

        try {
            const result = await axios.get('http://localhost:3030/users');
            let userFound = false;
            result.data.forEach(user => {
                if (user.email === formData.email) {
                    userFound = true;
                    if (user.password === formData.password) {
                        alert("Login successfully");
                        navigate('/'); // Redirection vers la page d'accueil ou une autre page
                    } else {
                        isvalid = false;
                        validationErrors.password = "Wrong Password";
                    }
                }
            });
            if (!userFound) {
                isvalid = false;
                validationErrors.email = "Wrong Email";
            }
            setErrors(validationErrors);
            setValid(isvalid);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <Background />
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh' // Assurez-vous que l'élément prend toute la hauteur de la vue
            }}>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="signup-form">
                            <div style={{ textAlign: 'center' }}> {/* Centre les éléments dans le conteneur parent */}
                                <img src={logo} alt="Home" style={imageStyle} />
                                <h4 style={{
                                    fontWeight: 'bold',
                                    fontSize: '20px',
                                    margin: '10px 0', // Ajustez l'espacement selon vos besoins
                                }}>Login</h4>

                                <p style={{
                                    fontSize: '13px',
                                    margin: '10px 0', // Ajustez l'espacement selon vos besoins
                                }}>
                                    Bienvenue de nouveau</p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                {!valid && (
                                    <span className="text-danger">
                                        {errors.email && `${errors.email}; `}
                                        {errors.password && `${errors.password}; `}
                                    </span>
                                )}
                                <div className="row">
                                    {/* Email */}
                                    <div className="mb-3 col-md-12">
                                        <label>
                                            Email <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Enter Email"
                                            style={{ borderRadius: '50px' }}
                                            onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                                        />
                                    </div>
                                    
                                    {/* Password */}
                                    <div className="mb-3 col-md-12">
                                        <label>
                                            Password <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Enter Password"
                                            style={{ borderRadius: '50px' }}
                                            onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                                        />
                                              <Link to="/resetpwd" style={{ marginLeft: '6px' }}>

                                        <button style={{ color: '#4D6466', fontWeight: 'bold' }} >mot de passe oublié</button></Link>
                                    </div>
                                    <div className="col-md-12 text-center">
                                        <Button
                                            type="submit"
                                            style={{ backgroundColor: '#4D6466', borderRadius: '50px', color: 'white', fontWeight: '400' }}
                                        >
                                            Connexion
                                            <FontAwesomeIcon icon={faRightToBracket} style={{ marginLeft: '8px' }} />
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

export default Login;
