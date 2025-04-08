// import React from "react";


// const AgeDistribution = ({ data }) => {

    
//     return (
//         <div>

//         </div>
//     )

// }

// export default AgeDistribution;


// import React from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

// const AgeDistribution = ({ data }) => {
//   // Aggregate counts for each age group
//   const ageGroups = ["Baby", "Young", "Adult", "Senior"];

//   const ageData = ageGroups.map((age) => {
//     let total = 0;
//     for (const type in data) {
//       total += data[type][age];
//     }
//     return { age, count: total };
//   });

//   return (
//     <div style={{ width: "100%", height: 300 }}>
//       <h3>Age Distribution of All Animals</h3>
//       <ResponsiveContainer>
//         <BarChart data={ageData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="age" />
//           <YAxis allowDecimals={false} />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="count" fill="#8884d8" name="Number of Animals" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default AgeDistribution;

import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const AgeDistribution = ({ data }) => {
  const ageGroups = ["Baby", "Young", "Adult", "Senior"];
  const colors = {
    Baby: "#8884d8",
    Young: "#82ca9d",
    Adult: "#ffc658",
    Senior: "#ff7f50"
  };

  // Transform data to array of objects per animal type
  const chartData = Object.entries(data).map(([type, values]) => ({
    type,
    Baby: values.Baby,
    Young: values.Young,
    Adult: values.Adult,
    Senior: values.Senior
  }));

  return (
    <div style={{ width: 400, height: 300 }}>
      <h3>Age Distribution by Animal Type</h3>
      <p>Each bar shows how many animals of each type fall into different age categories. Filter by age and type to see.</p>
      <ResponsiveContainer>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="type" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          {ageGroups.map((age) => (
            <Bar
              key={age}
              dataKey={age}
              stackId="a"
              fill={colors[age]}
              name={age}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AgeDistribution;