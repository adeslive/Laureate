import { FormLabel, Radio } from "@chakra-ui/react";
import { useField } from "formik";
import React from 'react';

type FormRadioProps = React.InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
};

const FormRadio: React.FC<FormRadioProps> = ({ ...props }) => {
    const [field] = useField({type: "radio", ...props});

    return (
            <Radio {...field}><FormLabel htmlFor={props.name}>{props.label}</FormLabel></Radio>
    )
}

export default FormRadio;