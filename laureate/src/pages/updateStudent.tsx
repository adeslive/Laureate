import { Alert, AlertIcon, Button, Center, Flex, HStack, RadioGroup, Text } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import FormField from '../components/FormField';
import FormRadio from '../components/FormRadio';
import Layout from '../components/Layout';
import { useSetStudent, AddStudentValues, StudentValidationSchema, useGetStudent } from '../schemas/studentSchema';


const UpdateStudent: React.FC<{}> = () => {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const [{ student, fetching }] = useGetStudent(id);
    const [updateStudent] = useSetStudent();
    const [created, setCreated] = React.useState(false);

    let initialValues: AddStudentValues;
    let body = null;

    if (fetching) {

    } else if (student) {
        initialValues = {
            first_name: student.first_name,
            last_name: student.last_name,
            birthdate: moment(student.birthdate).format('YYYY-MM-DD'),
            gender: student.gender,
            address: student.address,
            email: student.email
        };

        body = (
            <Formik
                initialValues={initialValues}
                validationSchema={StudentValidationSchema}
                onSubmit={(values, { setErrors }) => {
                    //Format date to local timezone
                    values.birthdate = moment(values.birthdate).format();

                    updateStudent(values, id)
                        .then(() => {
                            setCreated(true);
                            setTimeout(() => {
                                history.push('/students')
                            }, 1000);
                        })
                        .catch(data => {
                            setErrors(data);
                        })
                }}
            >
                {() => (
                    <Form>
                        <FormField name="first_name" label="First Name" />
                        <FormField name="last_name" label="Last Name" />
                        <FormField type="date" name="birthdate" label="Date of Birth" />
                        <FormField type="email" name="email" label="Email" />
                        <FormField resize="none" type="textarea" name="address" label="Address" />
                        <RadioGroup defaultValue={initialValues.gender}>
                            <HStack>
                                <FormRadio name="gender" label="Male" value="0" />
                                <FormRadio name="gender" label="Female" value="1" />
                            </HStack>
                        </RadioGroup>
                        <Flex justify="flex-end" gridGap={4}>
                            <Button type="button" colorScheme="gray" onClick={() => history.push('/')}>Cancel</Button>
                            <Button type="submit" colorScheme="gray">Submit</Button>
                        </Flex>
                    </Form>
                )}
            </Formik>
        )
    } else {
        body = (
            <Center>
                <Text>This student doesn't exist</Text>
            </Center>
        )
    }

    return (
        <Layout>
            {created &&
                <Alert status="success">
                    <AlertIcon />
                    Student updated successfully. Redirecting ...
                </Alert>
            }
            {body}
        </Layout>
    )
}

export default UpdateStudent;