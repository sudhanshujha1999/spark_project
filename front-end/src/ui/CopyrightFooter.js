import { Box, Typography } from './'
export const CopyrightFooter = () => {
  return (
    <Box
      style={{
        width: '100%',
        boxSizing: 'border-box',
        margin: '40px 0 0 0',
        padding: '20px 200px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backdropFilter: 'blur(6px)',
        backgroundColor: 'rgb(40 47 64 / 29%)',
      }}
    >
      <Typography>
        Copyright © 2021 Spark Esports Inc. All rights Reserved.
      </Typography>
      <Typography>Contact - Taylor@sparkesports.gg</Typography>
    </Box>
  )
}
