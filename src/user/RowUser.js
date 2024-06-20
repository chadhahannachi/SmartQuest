import React, { useContext } from 'react';
import { AiFillDelete, AiFillEdit, AiOutlineInfoCircle } from "react-icons/ai";
import { Td, Tr, Box, Button } from '@chakra-ui/react';
import UserDetailsModal from './UserDetailsModal';
import { GlobalContext } from '../GlobalWrapper';

function RowUser({ id, name, lastname, email, gender, ddn }) {
  const { DeleteUser, FindOneUser, onOpen } = useContext(GlobalContext);
  const [showDetailsModal, setShowDetailsModal] = React.useState(false);

  const handleEditClick = () => {
    onOpen(true);
    FindOneUser(id);
  };

  const handleDeleteClick = () => {
    if (id) {
      DeleteUser(id);
    } else {
      console.error('User ID is undefined');
    }
  };

  return (
    <Tr>
      <Td>{name}</Td>
      <Td>{lastname}</Td>
      <Td>{email}</Td>
      <Td>{gender}</Td>
      <Td>{ddn}</Td>
      <Td>
        <Box display="flex" gap="1">
          <Button colorScheme="gray" onClick={handleEditClick}>
            <AiFillEdit />
          </Button>
          <Button colorScheme="red" onClick={handleDeleteClick}>
            <AiFillDelete />
          </Button>
          <Button colorScheme="teal" onClick={() => setShowDetailsModal(true)}>
            <AiOutlineInfoCircle />
          </Button>
        </Box>
      </Td>
      <UserDetailsModal isOpen={showDetailsModal} onClose={() => setShowDetailsModal(false)} user={{ name, lastname, email, gender, ddn }} />
    </Tr>
  );
}

export default RowUser;
