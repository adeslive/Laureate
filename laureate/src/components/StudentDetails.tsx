import { Box, Center, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, ModalProps, Square, Text, Textarea, useDisclosure } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import Layout from './Layout';
import { useGetStudent } from '../schemas/studentSchema';
import { CloseIcon } from '@chakra-ui/icons';

type StudentDetailsProps = {
    isOpen: boolean,
    onClose: () => void,
    id: string
}

const StudentDetails: React.FC<StudentDetailsProps> = ({ isOpen, id, onClose }) => {
    const [{ student, fetching }] = useGetStudent(id);

    let body = null;

    if (fetching) {

    } else if (student) {
        body = (
            <Box backgroundColor="white" p={8} border="md" shadow="base" mx="auto" borderBottom="1px" borderColor="gray.100">
                <Flex justify="space-between">
                    <Heading>{student.first_name + ' ' + student.last_name}</Heading>
                    <CloseIcon onClick={onClose} cursor="pointer" />
                </Flex>
                <Flex justify="space-between" mt="4" minH="12rem" direction={["column", "row"]} gridGap={["4", "0"]}>
                    <Box w="100%" mt="4" h="100%">
                        <Text><b>Email:</b> {student.email}</Text>
                        <Text mt="2"><b>Date of Birth:</b> {moment(student.birthdate).format('MM/DD/YYYY')}</Text>
                        <Text mt="2"><b>Gender:</b> {student.gender == '0' ? "Male" : "Female"}</Text>
                    </Box>
                    <Box w="100%" h="100%">
                        <label htmlFor="address"><b>Address</b></label>
                        <Textarea name="address" readOnly id="address" resize="none" overflow="hidden" defaultValue={student.address}></Textarea>
                    </Box>
                </Flex>
            </Box>
        )
    } else {
        body = (
            <Center>
                <Text>This student doesn't exist</Text>
            </Center>
        )
    }

    return (
        <>
            <Square onClick={onClose} backgroundColor="blackAlpha.600" h="100vh" w="100vw" top="0" left="0" zIndex="0" position="absolute" />
            <Box position="absolute" zIndex="2" top="50%" left="32%">
                {body}
            </Box>
        </>
    );
}

export default StudentDetails;