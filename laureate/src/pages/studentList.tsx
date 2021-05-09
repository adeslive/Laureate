import React from 'react';
import { Table, Text, Tbody, Th, Thead, Tr, Center, Td } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { useDeleteStudent, useGetStudents } from '../schemas/studentSchema';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import Layout from '../components/Layout';

const StudentList: React.FC<{}> = () => {
    const [data, getStudents] = useGetStudents();
    const [deleteStudent] = useDeleteStudent();
    return (
        <Layout>
            <Center>
                <Text fontSize="xl">Students List</Text>
            </Center>
            <Table>
                <Thead>
                    <Tr>
                        <Th isNumeric>#</Th>
                        <Th>Name</Th>
                        <Th>Edit</Th>
                        <Th>Delete</Th>
                        <Th>View Details</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.students.map((value, index) => (
                        <Tr key={index}>
                            <Td>{index + 1}</Td>
                            <Td>{value.first_name +' '+ value.last_name}</Td>
                            <Td><Link to={`/students/${value._id}/update`}>< EditIcon/></Link></Td>
                            <Td><DeleteIcon cursor={"pointer"} onClick={() => deleteStudent(value._id).then(() => getStudents())}/></Td>
                            <Td><Link to={`/students/${value._id}/`}><Text color="teal">View Details</Text></Link></Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Layout>
    );
}

export default StudentList;