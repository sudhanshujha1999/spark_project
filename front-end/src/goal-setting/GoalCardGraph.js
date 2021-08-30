import React, { useState } from 'react'
import moment from 'moment'
import { Line } from 'react-chartjs-2'
import { Box, Button, Grid, Typography } from '../ui'
import { useStyles } from './styles'

export const GoalCardGraph = ({ goal, setAvg }) => {
  const classes = useStyles()

  var startDate = moment(goal.startDate).format('MM/DD/YYYY')
  var endDate = moment(goal.endDate).format('MM/DD/YYYY')
  let sum = 0
  let avg = 0
  if (goal.data.length > 0) {
    goal.data.forEach((data) => (sum += data.value))
    avg = sum / goal.data.length
    setAvg(Math.round(avg * 100) / 100)
  }

  const data = {
    labels: [startDate, endDate],
    datasets: [
      {
        label: goal.metric,
        data: goal.data
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
        backgroundColor: '#00d2d3',
        borderColor: '#00d2d3',
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
        backgroundColor: avg < goal.result ? '#e74c3c' : '#2ecc71',
        borderColor: avg < goal.result ? '#e74c3c' : '#2ecc71',
        borderWidth: 1,
      },
      {
        label: `Desired (${goal.result})`,
        data: [
          {
            x: startDate,
            y: goal.result,
          },
          {
            x: endDate,
            y: goal.result,
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
          ticks: {
            maxTicksLimit: 4,
          },
        },
      ],
      yAxes: [
        {
          display: true,
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
      display: false,
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
    <Box mt={1} style={{ margin: '20px 5px 20px 0' }}>
      <Line data={data} options={lineOptions} />
    </Box>
  )
}
