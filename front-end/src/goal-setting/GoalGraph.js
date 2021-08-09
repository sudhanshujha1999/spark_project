import React, { useState } from 'react'
import moment from 'moment'
import { Line } from 'react-chartjs-2'
import { SliderPicker } from 'react-color'
import { Box, Button, Grid, Typography } from '../ui'
import { useStyles } from './styles'
import PaletteIcon from '@material-ui/icons/Palette'
import CloseIcon from '@material-ui/icons/Close'

export const GoalGraph = (props) => {
  const [color, setColor] = useState('#9b59b6')
  const [pickColor, setPickColor] = useState(false)
  const classes = useStyles()

  var startDate = moment(props.startDate).format('MM/DD/YYYY')
  var endDate = moment(props.endDate).format('MM/DD/YYYY')
  let sum = 0
  let avg = 0
  if (props.goalData.length > 0) {
    props.goalData.forEach((data) => (sum += data.value))
    avg = sum / props.goalData.length
  }

  const data = {
    labels: [startDate, endDate],
    datasets: [
      {
        label: props.metric,
        data: props.goalData
          .map((data) => {
            return {
              x: moment(data.date).format('MM/DD/YYYY'),
              y: data.value,
            }
          })
          .sort((a, b) => {
            return new Date(a.x) - new Date(b.x)
          }),
        fill: false,
        backgroundColor: color,
        borderColor: color,
      },
      {
        label: `Avg (${Math.round(avg * 100) / 100})`,
        data: [
          {
            x: startDate,
            y: Math.round(avg * 100) / 100,
          },
          {
            x: endDate,
            y: Math.round(avg * 100) / 100,
          },
        ],
        fill: false,
        backgroundColor: avg < props.result ? '#e74c3c' : '#2ecc71',
        borderColor: avg < props.result ? '#e74c3c' : '#2ecc71',
        borderWidth: 1,
      },
      {
        label: `Desired (${props.result})`,
        data: [
          {
            x: startDate,
            y: props.result,
          },
          {
            x: endDate,
            y: props.result,
          },
        ],
        fill: false,
        backgroundColor: '#f39c12',
        borderColor: '#f39c12',
        borderWidth: 1,
      },
    ],
  }
  const lineOptions = {
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            unit: 'day',
            tooltipFormat: 'lll',
          },
          // ticks: {
          //   maxTicksLimit: 30,
          // },
        },
      ],
      yAxes: [
        {
          stacked: false,
          gridLines: {
            display: false,
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 1,
          },
        },
      ],
    },
    legend: {
      display: true,
      align: 'start',
      labels: {
        fontSize: 12,
        color: 'inherit',
      },
    },
    // tooltips: {
    //   enabled: true,
    //   mode: 'nearest',
    // },
    interaction: {
      mode: 'x',
    },
  }
  return (
    <Box mt={4}>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Box style={{ flex: '8' }}>
          <Typography
            style={{ margin: '0', textAlign: 'center', fontSize: '1.2em' }}
            className={classes.goalText}
            variant='h6'
          >
            <strong style={{ color: '#78e08f' }}>Current Avg:</strong>{' '}
            {Math.round(avg * 100) / 100}
          </Typography>
        </Box>

        <Box
          className={classes.swatch}
          onClick={() => setPickColor(!pickColor)}
          style={{
            backgroundColor: `${color}`,
            border: `3px solid ${color}`,
            flex: '1',
          }}
        >
          {pickColor ? <CloseIcon /> : <PaletteIcon />}
          {pickColor && (
            <Box className={classes.popover}>
              <Box className={classes.cover}>
                <SliderPicker
                  color={color}
                  onChange={(color) => setColor(color.hex)}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <Line data={data} options={lineOptions} />
    </Box>
  )
}
