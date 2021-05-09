import { Box } from "@chakra-ui/react";

type LayoutProps = {

}

const Layout : React.FC<LayoutProps> = ({children}) => {
    return (
        <Box w={["70%", "50%"]} mb="4" mx="auto">
            {children}
        </Box>
    );
}


export default Layout;