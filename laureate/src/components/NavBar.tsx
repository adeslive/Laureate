import { Box, Button, Flex } from '@chakra-ui/react';
import React from 'react';
import NavLink from './NavLink';

const NavBar: React.FC<{}> = () => {
    return (
        <Flex
            justify="space-between"
            w="100%"
            p={6}
        >
            <Button colorScheme="gray">Login</Button>
            <Box>
                <NavLink to="/students/add">Add Student</NavLink>
                <NavLink to="/">Student List</NavLink>
            </Box>
        </Flex>
    );
}

export default NavBar;