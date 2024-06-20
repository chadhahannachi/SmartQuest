import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Background from "../Background";
import { Box, Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, Radio, RadioGroup, Slide, Stack, Switch, useDisclosure, useRadio, useRadioGroup } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import logo from '../images/logo.png'; // Importez votre image

const Registration = () => {
    const [formData, setFormData] = useState({
        name: '',
        Lastname: '',
        gender: '',
        email: '',
        ddn: '',
        password: '',
        cpassword: '',
    });
    const [errors, setErrors] = useState({});
    const [valid, setValid] = useState(true);
    const navigate = useNavigate();
    const [isSwitchChecked, setIsSwitchChecked] = useState(false); // État pour suivre si le Switch est activé

    const imageStyle = {
        width: '100px', // Largeur de l'image (modifiable selon vos préférences)
        height: 'auto', // La hauteur s'ajuste automatiquement en fonction de la largeur
        margin: '35px auto 35px',
        marginBottom: '5px'

      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        let isvalid = true;
        let validationErrors = {};

        if (!formData.name) {
            isvalid = false;
            validationErrors.name = "Name required";
        }

        if (!formData.Lastname) {
            isvalid = false;
            validationErrors.Lastname = "Last name required";
        }

        if (!formData.email) {
            isvalid = false;
            validationErrors.email = "Email required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            isvalid = false;
            validationErrors.email = "Email is not valid";
        }
        if (!formData.ddn) {
            isvalid = false;
            validationErrors.ddn = "Birth date required";
        }

        if (!formData.password) {
            isvalid = false;
            validationErrors.password = "Password required";
        } else if (formData.password.length < 6) {
            isvalid = false;
            validationErrors.password = "Password length must be at least 6 characters";
        }

        if (formData.cpassword !== formData.password) {
            isvalid = false;
            validationErrors.cpassword = "Confirm password does not match";
        }

        if (!isSwitchChecked) {
            isvalid = false;
            validationErrors.terms = "You must accept the terms and conditions";
        }

        setErrors(validationErrors);
        setValid(isvalid);

        if (isvalid) {
            axios.post('http://localhost:3030/users', formData)
                .then(result => {
                    alert("Registered Successfully");
                     navigate('/login');
                })
                .catch(err => console.log(err));
        }
    };

    const { isOpen, onToggle } = useDisclosure()

    const RadioCard = (props) => {
        const { getInputProps, getRadioProps } = useRadio(props);
        const input = getInputProps();
        const checkbox = getRadioProps();

        return (
            <Box as='label'>
                <input {...input} />
                <Box
                    {...checkbox}
                    cursor='pointer'
                    borderWidth='1px'
                    borderRadius='3xl'
                    boxShadow='md'
                    _checked={{
                        bg: '#EF4346',
                        color: 'white',
                        borderColor: '#EF4346',
                    }}
                    _focus={{
                        boxShadow: 'outline',
                    }}
                    px={130}
                    py={1.5}
                >
                    {props.children}
                </Box>
            </Box>
        );
    };

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'gender',
        value: formData.gender,
        onChange: (value) => setFormData({ ...formData, gender: value }),
    });

    const group = getRootProps();


    return (
        <div>
            <Background />
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="signup-form">
                        <div style={{ textAlign: 'center' }}> {/* Centre les éléments dans le conteneur parent */}
      <img src={logo} alt="Home" style={imageStyle} />
      <h4 style={{
        fontWeight: 'bold',
        fontSize: '20px',
        margin: '10px 0', // Ajustez l'espacement selon vos besoins
      }}>Registration</h4>
      
      <p style={{
        fontSize: '13px',
        margin: '10px 0', // Ajustez l'espacement selon vos besoins
      }}>
        Welcome To{' '}
        <span style={{ fontWeight: 'bold', color: '#4D6466' }}>Smart</span>
        <span style={{ fontWeight: 'bold', color: '#EF4346' }}>Quest</span>
      </p>
    </div>
                            <form onSubmit={handleSubmit}>
                            
                                
                                {!valid && (
                                    <span className="text-danger">
                                        {errors.name && `${errors.name}; `}
                                        {errors.Lastname && `${errors.Lastname}; `}
                                        {errors.email && `${errors.email}; `}
                                        {errors.ddn && `${errors.ddn}; `}
                                        {errors.password && `${errors.password}; `}
                                        {errors.cpassword && `${errors.cpassword}; `}
                                        {errors.terms && `${errors.terms}; `}
                                    </span>
                                )}
                                <div className="row">
                                    {/* First name */}
                                    <div className="mb-3 col-md-6">
                                        <label>
                                            Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Enter First Name"
                                            style={{borderRadius: '50px'}}
                                            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                                        />
                                    </div>
                                    {/* Last Name */}
                                    <div className="mb-3 col-md-6">
                                        <label>
                                            Last Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="Lastname"
                                            className="form-control"
                                            placeholder="Enter Last Name"
                                            style={{borderRadius: '50px'}}
                                            onChange={(event) => setFormData({ ...formData, Lastname: event.target.value })}
                                        />
                                    </div>
                                    {/* Gender */}
                                    <div className="mb-3 col-md-12">
                                        <label>
                                            Gender <span className="text-danger">*</span>
                                        </label>
                                        <HStack {...group} spacing={8}>
                                            {['male', 'female'].map((value) => {
                                                const radio = getRadioProps({ value });
                                                return (
                                                    <RadioCard key={value} {...radio}>
                                                        {value.charAt(0).toUpperCase() + value.slice(1)}
                                                    </RadioCard>
                                                );
                                            })}
                                        </HStack>
                                    </div>

                                    {/* Email */}
                                    <div className="mb-3 col-md-6">
                                        <label>
                                            Email <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Enter Email"
                                            style={{borderRadius: '50px'}}
                                            onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                                        />
                                    </div>
                                    {/* ddn */}
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="ddn">Date of Birth <span className="text-danger">*</span></label>
                                        <input
                                            type="date"
                                            name="ddn"
                                            className="form-control"
                                            placeholder="Enter birth date"
                                            style={{borderRadius: '50px'}}
                                            onChange={(event) => setFormData({ ...formData, ddn: event.target.value })}
                                        />
                                    </div>
                                    {/* Password */}
                                    <div className="mb-3 col-md-6">
                                        <label>
                                            Password <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Enter Password"
                                            style={{borderRadius: '50px'}}
                                            onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label>
                                            Confirm Password <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            name="cpassword"
                                            className="form-control"
                                            placeholder="Confirm Password"
                                            style={{borderRadius: '50px'}}
                                            onChange={(event) => setFormData({ ...formData, cpassword: event.target.value })}
                                        />
                                    </div>
                                    <p style={{
                                        fontSize: '15px',
                                        margin: '0 auto',
                                        width: '80%',
                                        maxWidth: '800px',
                                        textAlign: 'center',
                                        margin: '35px auto 35px',
                                        display: 'inline-block',
                                        color: 'black'
                                    }}>
                                        J'ai lu <button type="button" onClick={onToggle} style={{ color: '#EF4346' }} > les conditions d'utilisations</button>
                                        <Slide direction='bottom' in={isOpen} style={{ zIndex: 10 }}>
                                            <Box
                                                p='60px'
                                                color='white'
                                                mt='4'
                                                bg='#4D6466'
                                                rounded='md'
                                                shadow='md'
                                            >
                                                Lorem ipsum dolor sit amet. Eos libero veniam aut beatae assumenda id dolorem rerum. 
                                                Sed voluptas nihil nam dolor labore est fugiat cupiditate aut inventore possimus in facilis sint! 
                                                Vel porro soluta quo alias neque et repellendus reiciendis a sunt asperiores.
                                            </Box>
                                        </Slide> et je les accepte 
                                        <Switch id='email-alerts' style={{ marginLeft: '10px' }} isChecked={isSwitchChecked} onChange={() => setIsSwitchChecked(!isSwitchChecked)} />
                                    </p>
                                    <div className="col-md-12 text-center">
                                        <Button
                                            type="submit"
                                            style={{ backgroundColor: '#4D6466', borderRadius: '50px', color: 'white', fontWeight: '400' }}
                                        >
                                            <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: '8px' }} />
                                            Sign up Now
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

export default Registration;
