import React from 'react'
import moment from 'moment'

import { Line } from 'react-chartjs-2'

export const GoalGraph = (props) => {
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
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
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
          stacked: true,
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
    },
    tooltips: {
      enabled: true,
      mode: 'nearest',
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true,
      },
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: 2,
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 4,
          label: {
            enabled: false,
            content: 'Test label',
          },
        },
      ],
    },
  }
  return (
    <div className='App'>
      <Line data={data} options={lineOptions} />
    </div>
  )
}
