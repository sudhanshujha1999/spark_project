import { Box, Grid } from '../ui'
import React, { useState } from 'react'
import { HuePicker } from 'react-color'
import CheckIcon from '@material-ui/icons/Check'
import { makeStyles } from '@material-ui/styles'

export const ColorPicker = ({
  setBackgroundColor,
  setColors,
  colors,
  setPickColor,
}) => {
  const classes = useStyles()
  const [color, setColor] = useState('#f5f5f5')
  const onSelect = () => {
    setBackgroundColor({ name: `add${color}`, background: color })
    if (colors.length >= 8) {
      colors.shift()
      setColors([...colors, { name: `add${color}`, background: color }])
    } else {
      setColors([...colors, { name: `add${color}`, background: color }])
    }
    setPickColor(false)
  }
  return (
    <Box className={classes.pickerContainer}>
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

const useStyles = makeStyles((theme) => ({
  pickerContainer: {
    padding: '0 10px',
    alignSelf: 'center',
    transform: 'scale(0)',
    tranistiom: '0.2s all ease-out',
    animation: '$picker 0.4s ease-out forwards',
    animationDelay: '0s',
    marginBottom: '10px',
  },
  '@keyframes picker': {
    '0%': {
      transform: 'scale(0) ',
    },
    '100%': {
      opacity: 1,
      transform: 'scale(1) ',
    },
  },
}))
