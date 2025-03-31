import React, { useState, useEffect } from "react";

const Animal = ({ name, type, breed, age, gender, size }) => {
    return (
        <>

            

            <td>{name}</td>
            <td>{breed}</td>
            <td>{type}</td>
            <td>{gender}</td>
            <td>{age}</td>
            <td>{size}</td>


        </>
    )
}

export default Animal;