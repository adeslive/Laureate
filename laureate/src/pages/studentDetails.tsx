import { Box, Center, Flex, Heading, Text, Textarea } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import { useParams } from 'react-router';
import Layout from '../components/Layout';
import { useGetStudent } from '../schemas/studentSchema';

const StudentDetails: React.FC<{}> = () => {
    const { id } = useParams<{ id: string }>();
    const [{ student, fetching }] = useGetStudent(id);

    let body = null;

    if (fetching) {

    } else if (student) {
        body = (
            <Layout>
                <Box backgroundColor="whiteAlpha.300" p={4} border="md" shadow="base" borderBottom="1px" borderColor="gray.100">
                    <Heading>{student.first_name + ' ' + student.last_name}</Heading>
                    <Flex justify="space-between" mt="4" minH="12rem" direction={["column", "row"]} gridGap={["4", "0"]}>
                        <Box w="100%" mt="4" h="100%">
                            <Text><b>Email:</b> {student.email}</Text>
                            <Text mt="2"><b>Date of Birth:</b> {moment(student.birthdate).format('MM/DD/YYYY')}</Text>
                            <Text mt="2"><b>Gender:</b> {student.gender == '0' ? "Male" : "Female"}</Text>
                        </Box>
                        <Box w="100%" h="100%">
                            <label htmlFor="address"><b>Address</b></label>
                            <Textarea name="address" readOnly id="address"  resize="none" overflow="hidden" defaultValue={student.address}></Textarea>
                        </Box>
                    </Flex>
                </Box>
            </Layout>
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
            {body}
        </>
    );
}

export default StudentDetails;