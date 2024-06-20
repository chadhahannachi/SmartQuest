// UserDetailsModal.js
import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text } from '@chakra-ui/react';

function UserDetailsModal({ isOpen, onClose, user }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent borderRadius="md" bg="gray.100">
        <ModalHeader color="teal.500">User Details</ModalHeader>
        <ModalCloseButton color="teal.500" />
        <ModalBody>
          <Text fontSize="lg" fontWeight="bold">User Name:</Text>
          <Text>{user?.name}</Text>
          <Text fontSize="lg" fontWeight="bold">Last Name:</Text>
          <Text>{user?.lastname}</Text>
          <Text fontSize="lg" fontWeight="bold">Email:</Text>
          <Text>{user?.email}</Text>
          <Text fontSize="lg" fontWeight="bold">Gender:</Text>
          <Text>{user?.gender}</Text>
          <Text fontSize="lg" fontWeight="bold">Birth Date:</Text>
          <Text>{user?.ddn}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default UserDetailsModal;
