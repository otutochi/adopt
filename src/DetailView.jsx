import React from "react";
import { useEffect, useState, useMemo } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import './DetailView.css';

const DetailView = () => {

    const { id } = useParams();
    const { animals } = useOutletContext();

    const animalMap = useMemo(() => {
        return animals.reduce((acc, animal)=> {
            acc[animal.id] = animal;
            return acc;
        }, {});
    }, [animals]);

    const animal = animalMap[id];

    if(!animal) {
        return <p>Pet not found</p>;
    }

    const addressToString = (address) => {

        const addressString = [
            address.address1,
            address.city,
            address.state,
            address.postcode,
            address.country
        ]

        return addressString.filter(Boolean).join(", ");
    }
    

    return (
        <div className="detailView" >

            <div className="detailHeader">
                {animal.primary_photo_cropped &&  animal.primary_photo_cropped.small && <div>
                    <img src={animal.primary_photo_cropped.small} alt="Pet image" />
                </div>}

                <div>
                    <h1>{animal.name || "Unknown"}</h1>
                    <p><strong>Status:</strong> {animal.status || "N/A"}</p>
                    <p><strong>Email:</strong> {animal.contact.email || "N/A"}</p>
                    <p><strong>Phone:</strong> {animal.contact.phone || "N/A"}</p>
                    <p><strong>Address:</strong> {animal.contact.address ? addressToString(animal.contact.address): "N/A"}</p>
                </div>
            </div>

            
            
            <div className="detailInfo">
                
                <p><strong>Type:</strong> {animal.type || "N/A"}</p>
                <p><strong>Primary Breed:</strong> {animal.breeds.primary || "N/A"}</p>
                <p><strong>Secondary Breed:</strong> {animal.breeds.secondary || "N/A"}</p>
                <p><strong>Gender:</strong> {animal.gender || "N/A"}</p>
                <p><strong>Age:</strong> {animal.age || "N/A" }</p>
                <p><strong>Size:</strong> {animal.size || "N/A" }</p>
                <p><strong>Coat:</strong> {animal.coat || "N/A" }</p>
                <p><strong>Primary Color:</strong> {animal.colors.primary || "N/A"}</p>
                <p><strong>Secondary Color:</strong> {animal.colors.secondary || "N/A"}</p>
                <p><strong>Tags: </strong>{(animal.tags.length != 0) ?  animal.tags.join(', ') : "N/A"}</p>
                <p><strong>House-trained: </strong>{(animal.attributes.house_trained) ? "Yes" : "No"}</p>
                <p><strong>Declawed: </strong>{(animal.attributes.declawed) ? "Yes" : "No"}</p>
                <p><strong>Good with children: </strong>{(animal.environment.children) ? "Yes" : "No"}</p>
                <p><strong>Good with dogs: </strong>{(animal.environment.dogs) ? "Yes" : "No"}</p>
                <p><strong>Good with cats: </strong>{(animal.environment.cats) ? "Yes" : "No"}</p>
                

            </div>

        </div>
    )
}


export default DetailView;