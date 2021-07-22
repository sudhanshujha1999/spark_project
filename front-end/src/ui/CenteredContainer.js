import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

export const CenteredContainer = ({ children }) => {
  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justify='center'
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={6}>
        <Box style={{ minWidth: 600 }}>{children}</Box>
      </Grid>
    </Grid>
  )
}
