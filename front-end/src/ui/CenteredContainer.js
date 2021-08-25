import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

export const CenteredContainer = ({ children, maxWidth }) => {
    return (
        <Grid
            container
            spacing={0}
            direction='column'
            alignItems='center'
            justifyContent='center'
            style={{ minHeight: "85vh" }}>
            <Grid>
                <Box style={{ minWidth: 450, maxWidth: maxWidth ? maxWidth : "100vw" }}>
                    {children}
                </Box>
            </Grid>
        </Grid>
    );
};
