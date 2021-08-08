import React from 'react'
import moment from 'moment'

import { Line } from 'react-chartjs-2'

export const GoalGraph = (props) => {
  console.log(props.desired)
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
        backgroundColor: '#9b59b6',
        borderColor: '#9b59b6',
      },
      {
        label: `Avg (${avg})`,
        data: [
          {
            x: startDate,
            y: avg,
          },
          {
            x: endDate,
            y: avg,
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
            suggestedMin: 100,
            suggestedMax: 0,
          },
        },
      ],
    },
    legend: {
      display: true,
      labels: {
        fontSize: 12,
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
    <div className='App'>
      <Line data={data} options={lineOptions} />
    </div>
  )
}
