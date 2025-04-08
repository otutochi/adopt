import React, { useState, useEffect } from "react";
import { Link } from "react-router";

const Animal = ({ id, name, type, breed, age, gender, size }) => {
    return (
        <>

            

            <td><Link to={`/detailView/${id}`} className="linkStyle" style={{color:"#c4a484", fontWeight:"bold"}}>{name}</Link></td>
            <td>{breed}</td>
            <td>{type}</td>
            <td>{gender}</td>
            <td>{age}</td>
            <td>{size}</td>


        </>
    )
}

export default Animal;