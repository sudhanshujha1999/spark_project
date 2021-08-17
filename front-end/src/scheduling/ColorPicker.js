import { Box, Grid } from '../ui'
import React, { useState } from 'react'
import { HuePicker } from 'react-color'
import CheckIcon from '@material-ui/icons/Check'

export const ColorPicker = ({
  setBackgroundColor,
  setColors,
  colors,
  setPickColor,
}) => {
  const [color, setColor] = useState('#f5f5f5')
  const onSelect = () => {
    setBackgroundColor({ name: `add${color}`, background: color })
    setColors([...colors, { name: `add${color}`, background: color }])
    setPickColor(false)
  }
  return (
    <Box style={{ padding: '0 10px' }}>
      <Grid
        container
        style={{
          padding: '0 10px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <HuePicker color={color} onChange={(color) => setColor(color.hex)} />
        <Box style={{ color: `${color}`, fontSize: '15px', cursor: 'pointer' }}>
          <CheckIcon style={{ margin: '5px 0 0 10px' }} onClick={onSelect} />
        </Box>
      </Grid>
    </Box>
  )
}
