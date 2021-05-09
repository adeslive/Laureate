import React from 'react';
import { Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { Alert, AlertIcon, Button, Flex, FormLabel, HStack, Radio, RadioGroup } from '@chakra-ui/react';

import FormField from '../components/FormField';
import FormRadio from '../components/FormRadio';
import Layout from '../components/Layout';
import { AddStudentValues, StudentValidationSchema, useSetStudent } from '../schemas/studentSchema';
import moment from 'moment';

const AddStudent: React.FC<{}> = () => {
    const history = useHistory();
    const [addStudent] = useSetStudent();
    const [created, setCreated] = React.useState(false);
    
    const initialValues: AddStudentValues =
    {
        first_name: '',
        last_name: '',
        birthdate: moment().format('YYYY-MM-DD'),
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
                    //Format date to local timezone
                    values.birthdate = moment(values.birthdate).format();

                    addStudent(values)
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