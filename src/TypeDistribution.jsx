import React from "react";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const TypeDistribution = ({ data }) => {


    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#a4de6c'];

    const countData = Object.entries(data).map(([type, values])=> ({
        name: type,
        value: values.count
    }))

    console.log(countData)

    


    return (
        <div style={{width:400, height:300}}>
            <h3>Type Distribution of Available Pets</h3>
            <p>This chart shows the proportion of animals by type currently available for adoption. Filter by animal type to see.</p>
            <PieChart width={400} height={300}>
                <Pie 
                    data = {countData}
                    cx = "50%"
                    cy = "50%"
                    outerRadius={100}
                    dataKey="value"
                    nameKey="name"
                    label = {({ name, value }) => `${name}: ${value}`}

                >
                    {countData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>

            

        </div>
    )

}

export default TypeDistribution;