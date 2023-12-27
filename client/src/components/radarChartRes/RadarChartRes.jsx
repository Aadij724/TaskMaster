import React, { PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';


const RadarChartRes = () => {

    const data = [
    {
        subject: 'Productivity',
        A: 60,
        fullMark: 100,
    },
    {
        subject: 'Health',
        A: 80,
        fullMark: 100,
    },
    {
        subject: 'Screen Time',
        A: 86,
        fullMark: 100,
    },
    {
        subject: 'Stress',
        A: 99,
        fullMark: 100,
    },
    // {
    //     subject: 'Physics',
    //     A: 85,
    //     B: 90,
    //     fullMark: 150,
    // },
    // {
    //     subject: 'History',
    //     A: 65,
    //     B: 85,
    //     fullMark: 150,
    // },
    ];

  return (
    <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
  )
}

export default RadarChartRes