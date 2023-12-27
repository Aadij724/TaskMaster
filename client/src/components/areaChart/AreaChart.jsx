import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart';

const AreaChart = () => {
  

  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const xLabels = [
    'Sleep',
    'Office',
    'Ext work',
    'Free',
    'Hobbie',
    'Exercise',
    'Screen',
  ];

  return (
    <LineChart
    width={410}
    height={270}
    series={[
      { data: uData, label: 'hours' },
    ]}
    xAxis={[{ scaleType: 'point', data: xLabels }]}
  />
  )
}

export default AreaChart