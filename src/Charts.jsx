import React from "react";
import TypeDistribution from "./TypeDistribution";
import AgeDistribution from "./AgeDistribution";



const Charts = ({ data }) => {

    return (
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly" }}>

            { data && <TypeDistribution data = {data} />}

            { data && <AgeDistribution data = {data} />}

        </div>
    )

}

export default Charts;