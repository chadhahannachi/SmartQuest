import React, { useContext, useEffect, useState } from 'react';
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Stack, Input, FormControl, FormErrorMessage, FormLabel, Select } from '@chakra-ui/react';
import { GlobalContext } from '../GlobalWrapper';

export default function DrawerForm() {
  const { isOpen, onClose, AddUser, Update, errors, setErrors, user } = useContext(GlobalContext);
  const [form, setForm] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (user && Object.keys(user).length !== 0) {
      setForm(user);
      setEditMode(true);
    } else {
      setForm({});
      setEditMode(false);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      Update(form, setForm, form.id);  // Utiliser l'ID ici pour la mise à jour
    } else {
      AddUser(form, setForm);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    setForm({});
    setErrors({});
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={handleClose}>
      <DrawerOverlay />
      <form onSubmit={handleSubmit}>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{editMode ? 'Edit User' : 'Create a new User'}</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <FormControl isInvalid={errors.name}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  name="name"
                  id="name"
                  value={form.name || ''}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.lastname}>
                <FormLabel htmlFor="lastname">Last Name</FormLabel>
                <Input
                  name="lastname"
                  id="lastname"
                  value={form.lastname || ''}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.lastname}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  name="email"
                  id="email"
                  value={form.email || ''}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.gender}>
                <FormLabel htmlFor="gender">Gender</FormLabel>
                <Select
                  name="gender"
                  id="gender"
                  value={form.gender || ''}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Select>
                <FormErrorMessage>{errors.gender}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.ddn}>
                <FormLabel htmlFor="ddn">Date of Birth</FormLabel>
                <Input
                  type="date"
                  name="ddn"
                  id="ddn"
                  value={form.ddn || ''}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.ddn}</FormErrorMessage>
              </FormControl>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={handleClose}>
              Cancel
            </Button>
            <Button colorScheme="teal" type="submit">{editMode ? 'Update' : 'Submit'}</Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
}
