import React, { useEffect, useState } from 'react'
import { PieChart } from '@mui/x-charts/PieChart';

const PieChart2 = ({tasks,userdata,teamId}) => {

  const [dataChart,setDataChart] = useState([]);
  const [value,setValue] = useState(0)
  const [skillsList,setSkillsList] = useState(["React",]);
  // const [skillsList]

  useEffect(()=>{
    console.log("At Pie Chart 2 useEffect ",userdata)

    const noOfSkills = Number(userdata.skills.length);
    const new_value = 360/noOfSkills;
    setValue(new_value);
    console.log(new_value)

    const new_data = [];
    
    console.log(value);
    var i=0;
    userdata.skills.forEach(skill => {
      new_data.push(
        { id: i++, value: value, label: skill }
      )
    });
    console.log(new_data);

    setDataChart(new_data);

    
  },[tasks])

  return (
    <div>
      {
        dataChart ?
        <PieChart
          series={[
            {
              data: dataChart,
                innerRadius: 30,
                outerRadius: 90,
                paddingAngle: 2,
                cornerRadius: 10,
                startAngle: 0,
                endAngle: 360,
                cx: 100,
                cy: 150,
            },
          ]}
          width={320}
          height={250}
        /> :
        <></>
      }
    </div>
    
    
    
  )
}

export default PieChart2