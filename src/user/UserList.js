import { useContext, useEffect, useState } from 'react';
import { Box, Button, Table, TableContainer, Tbody, Text, Th, Thead, Tr, Input, Flex } from '@chakra-ui/react';
import { AiOutlinePlus, AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import DrawerForm from './DrawerForm';
import { GlobalContext } from '../GlobalWrapper';
import RowUser from './RowUser';

function UserList() {
  const { FetchUsers, users,onOpen } = useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(4);

  useEffect(() => {
    FetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.Lastname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Box mt="5" rounded={'lg'} boxShadow="base">
      <Box display="flex">
        <Box flexGrow={1}>
          <Box p="4" display={'flex'} justifyContent="space-between" alignItems="center">
            <Text fontSize="xl" fontWeight="bold">List User</Text>
            <Button
              colorScheme="teal"
              variant="outline"
              maxW={'300px'}
              minW="150px"
              leftIcon={<AiOutlinePlus fontSize={'20px'} />}
              onClick={onOpen}
            >
              Add New User
            </Button>
          </Box>

          <Box p="4">
            <Input
              placeholder="Search user"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>

          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>User Name</Th>
                  <Th>Last Name</Th>
                  <Th>Email</Th>
                  <Th>Gender</Th>
                  <Th>Birth Date</Th>
                  
                </Tr>
              </Thead>
              <Tbody>
                {currentUsers.map(({ id, name, Lastname, email, gender, ddn }) => (
                  <RowUser
                    key={id}
                    id={id}
                    name={name}
                    Lastname={Lastname}
                    email={email}
                    gender={gender}
                    ddn={ddn}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          <Flex justifyContent="center" alignItems="center" mt="4">
            <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} leftIcon={<AiOutlineArrowLeft />} />
            <Box mx="2" p="2" borderRadius="md" bgColor="teal" color="white">{currentPage}</Box>
            <Button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastUser >= filteredUsers.length} rightIcon={<AiOutlineArrowRight />} />
          </Flex>
        </Box>
      </Box>

      <DrawerForm />
    </Box>
  );
}

export default UserList;
