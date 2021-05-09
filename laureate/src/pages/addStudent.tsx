import { Alert, AlertIcon, Button, Flex, HStack, RadioGroup } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router-dom';
import FormField from '../components/FormField';
import FormRadio from '../components/FormRadio';
import Layout from '../components/Layout';
import { AddStudentValues, StudentValidationSchema, useSetStudent } from '../schemas/studentSchema';


const AddStudent: React.FC<{}> = () => {
    const history = useHistory();
    const [addStudent] = useSetStudent();
    const [created, setCreated] = React.useState(false);
    
    const initialValues: AddStudentValues =
    {
        first_name: '',
        last_name: '',
        birthdate: '',
        gender: '0',
        address: '',
        email: ''
    }

    return (
        <Layout>
            {created &&
                <Alert status="success">
                    <AlertIcon />
                    Student created successfully. Redirecting ...
                </Alert>
            }
            <Formik
                initialValues={initialValues}
                validationSchema={StudentValidationSchema}
                onSubmit={(values, { setErrors }) => {
                    // Format date to local timezone
                    // Prevents date override when doing a submit
                    let newValues: AddStudentValues = {
                        first_name: values.first_name,
                        last_name: values.last_name,
                        address: values.address,
                        birthdate: moment(values.birthdate).format(),
                        gender: values.gender,
                        email: values.email
                    }

                    addStudent(newValues)
                        .then(() => {
                            setCreated(true);
                            setTimeout(() => {
                                history.push('/')
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
        </Layout>
    )
}

export default AddStudent;