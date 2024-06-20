import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useDisclosure, useToast } from '@chakra-ui/react';

export const GlobalContext = createContext();

export default function Wrapper({ children }) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const FetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3030/users');
      setUsers(res.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const DeleteUser = async (id) => {
    if (!id) return;
    try {
      await axios.delete(`http://localhost:3030/users/${id}`);
      FetchUsers();
    } catch (error) {
      console.error('Delete User Error:', error);
    }
  };

  const AddUser = (form, setForm) => {
    axios.post('http://localhost:3030/users', form)
      .then((res) => {
        setUsers([...users, res.data]);
        toast({
          title: 'User Added',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        setErrors({});
        setForm({});
        onClose();
      })
      .catch((err) => {
        setErrors(err.response.data.error);
      });
  };

  const FindOneUser = async (id) => {
    if (!id) return;
    try {
      const res = await axios.get(`http://localhost:3030/users/${id}`);
      setUser(res.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const Update = (form, setForm, id) => {
    axios.put(`http://localhost:3030/users/${id}`, form)
      .then((res) => {
        toast({
          title: 'User Updated',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        setErrors({});
        setForm({});
        onClose();
        FetchUsers();
      })
      .catch((err) => {
        setErrors(err.response.data.error);
      });
  };

  // const resetPassword = async (userId, newPassword) => {
  //   try {
  //     const response = await axios.post('http://localhost:3030/reset-password', {
  //       userId: userId,
  //       newPassword: newPassword
  //     });
  //     console.log(response.data); // Log successful response
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error resetting password:', error);
  //     throw error; // Propagate the error up to handle it in your component
  //   }
  // };

  return (
    <GlobalContext.Provider value={{ 
      FetchUsers, 
      users, 
      DeleteUser, 
      AddUser, 
      isOpen,
      onOpen,
      onClose,
      errors,
      setErrors,
      FindOneUser,
      user,
      Update,
      // resetPassword  
    }}>
      {children}
    </GlobalContext.Provider>
  );
}
