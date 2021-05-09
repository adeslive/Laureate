import moment from 'moment';
import React, { useEffect } from 'react';
import * as Yup from 'yup';

const url = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Interface for Formik initial values
export interface AddStudentValues {
    first_name: string;
    last_name: string;
    address: string;
    email: string;
    gender: string;
    birthdate: string;
}

// Validation Schema for forms
export const StudentValidationSchema = Yup.object().shape({
    first_name: Yup.string()
        .required("You have to enter your first name"),
    last_name: Yup.string()
        .required("You have to enter your last name"),
    email: Yup.string()
        .email("Invalid email")
        .required("The email is required"),
    gender: Yup.boolean()
        .required(),
    birthdate: Yup.date()
        .max(moment(), "Date of Birth invalid")
        .required("You have to enter a date")
})

export type StudentProps = AddStudentValues &
{
    _id: string;
}

type getStudentsProps = {
    fetching: boolean,
    students: StudentProps[]
}

type getStudentProps = {
    fetching: boolean,
    student?: StudentProps
}

export const useGetStudents = (): [data: getStudentsProps, getStudents: () => Promise<void>] => {
    const [{ fetching, students }, setStudents] = React.useState<getStudentsProps>({ fetching: true, students: [] });

    const getStudents = async () => {
        setStudents({ fetching: true, students: students });
        const res = await fetch(`${url}/students`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        // Catch should manage the null
        if (data == null)
            throw null;
        if (data.errors)
            throw data.errors;
        setStudents({ fetching: false, students: data });
    }

    // Get Initial students
    // Set the dependency array to avoid re render loop
    useEffect(() => {
        getStudents();
    },[]);

    return [{ fetching, students }, getStudents];
}

export const useGetStudent = (id: string): [data: getStudentProps, getStudent: () => Promise<void>] => {
    const [{ fetching, student }, setStudents] = React.useState<getStudentProps>({ fetching: true });

    const getStudent = async () => {
        setStudents({ fetching: true, student: student });
        const res = await fetch(`${url}/students/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();

        // Catch should manage the null
        if (data == null || data.errors) {
            setStudents({ fetching: false });
            throw data == null ? data : data.errors
        } else {
            setStudents({ fetching: false, student: data });
        }
    }

    // Get Initial student
    // Set the dependency array to avoid re render loop
    useEffect(() => {
        getStudent();
    }, []);

    return [{ fetching, student }, getStudent];
}

export const useSetStudent = (): [getStudents: (values: AddStudentValues, id?: string) => Promise<void>] => {
    const setStudent = async (values: AddStudentValues, id?: string) => {
        const path = `${url}/students/${id !== undefined ? id : ''}`;
        const res = await fetch(path, {
            method: id ? 'PATCH' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        });
        // Catch should manage the null
        const data = await res.json();
        if (data == null || data.errors)
            throw data == null ? data : data.errors
    }
    return [setStudent]
}

export const useDeleteStudent = () => {
    const deleteStudent = async (id: string) => {
        const res = await fetch(`${url}/students/${id}`, {
            method: 'DELETE'
        })
        const data = await res.json();
        // Catch should manage the null
        if (data == null || data.errors)
            throw data == null ? data : data.errors
    }
    return [deleteStudent];
}