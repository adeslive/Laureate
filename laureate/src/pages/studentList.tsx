import React from 'react';
import { Table, Text, Tbody, Th, Thead, Tr, Center, Td, useDisclosure, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { useDeleteStudent, useGetStudents } from '../schemas/studentSchema';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import Layout from '../components/Layout';
import StudentDetails from '../components/StudentDetails';

const StudentList: React.FC<{}> = () => {
    const [data, getStudents] = useGetStudents();
    const [deleteStudent] = useDeleteStudent();
    const [modalOpen, setModalOpen] = React.useState({
        isOpen: false,
        id: '',
    });

    return (
        <Layout>
            <Center>
                <Text fontSize="xl">Students List</Text>
            </Center>
            <Table variant="simple">
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
                            <Td><DeleteIcon cursor="pointer" onClick={() => deleteStudent(value._id).then(() => getStudents())}/></Td>
                            <Td><Button variant="link" onClick={() => setModalOpen({isOpen: true, id: value._id})}><Text color="teal">View Details</Text></Button></Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            {
                modalOpen.isOpen &&
                <StudentDetails id={modalOpen.id} isOpen={modalOpen.isOpen} onClose={() => setModalOpen({isOpen: false, id: ''})}/>
            }
        </Layout>
    );
}

export default StudentList;