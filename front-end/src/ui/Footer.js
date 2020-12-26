import Box from '@material-ui/core/Box';

export const Footer = () => {
    return (
        <Box style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            textAlign: 'center',
            paddingLeft: "240px",
        }}>
            <p>Terms &amp; Privacy</p>
        </Box>
    );
}