import {Box} from "native-base";

export default function BasicBox({children}) {
    return <Box borderWidth={1} padding={1} borderRadius={10}>
        {children}
    </Box>
}