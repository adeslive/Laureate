import { Button } from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';

type NavLinkProps = {
   to: string;
}

const NavLink : React.FC<NavLinkProps> = ({children, ...props}) => {
    return (
        <Button colorScheme="gray" mx="1" variant="link">
            <RouterLink to={props.to}>{children}</RouterLink>
        </Button>
    );
}

export default NavLink;