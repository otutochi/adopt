import React, { useState, useEffect } from "react";
import Animal from "./Animal";

const Page = ({ animals, page, pageLength, numPages }) => {

    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(0);

    
    useEffect(()=> {

        setStart(pageLength * (page-1));
    
        setEnd(page == numPages ? animals.length : pageLength * page);

    }, [page, animals, pageLength, numPages])
    

    return (

        <>
            <table>
                <thead>
                    <tr>
                        <th><strong>Name</strong></th>
                        <th><strong>Breed</strong></th>
                        <th><strong>Type</strong></th>
                        <th><strong>Gender</strong></th>
                        <th><strong>Age</strong></th>
                        <th><strong>Size</strong></th>
                    </tr>
                </thead>
                <tbody>
                    {animals.slice(start, end).map((animal, index) => <tr key={index} >< Animal
                        
                        id = {animal.id || "N/A"}
                        name = {animal.name || "N/A"}
                        type = {animal.type || "N/A"}
                        breed = {animal.breeds.primary || "N/A"}
                        age = {animal.age || "N/A"}
                        gender = {animal.gender || "N/A"}
                        size = {animal.size || "N/A"}
                    /></tr>  )}
                </tbody>
            </table>
        </>
    )
    



}


export default Page;