import { FormControl, FormErrorMessage, FormLabel, Input, InputProps, Textarea, TextareaProps } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';

type FormFieldProps = React.InputHTMLAttributes<HTMLInputElement> & InputProps &  TextareaProps & {
    name: string;
    label: string;
};


const FormField: React.FC<FormFieldProps> = ({ size: _, ...props }) => {
    const [field, { error, }] = useField(props);
    const inputField = props.type && props.type === 'textarea' ? <Textarea {...field} {...props} id={field.name} /> : <Input {...field} {...props} id={field.name} />
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
            {inputField}
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    );
}

export default FormField;