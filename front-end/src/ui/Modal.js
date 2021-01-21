import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import ModalBase from '@material-ui/core/Modal';

const ModalContent = ({ children }) => {
    return (
        <Box
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}
        >
            <Paper>
                <Box p={2}>
                    {children}
                </Box>
            </Paper>
        </Box>
    )
}

export const Modal = ({ children, ...props }) => {
    return (
        <ModalBase {...props}>
            <ModalContent>
                {children}
            </ModalContent>
        </ModalBase>
    );
}