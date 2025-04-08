import React from "react";

const About = () => {
    return (
        <div className="about" style={{marginLeft:"150px", textAlign:"left", marginTop:"0", padding:"2rem"}}>
            <h3>About <span style={{fontStyle:"italic", color:"#c4a484"}}>Adopt</span></h3>
            <p>Pdopt is an interactive and user-friendly web application designed to help users explore adoptable pets from across the United States. Pdopt provides real-time access to a variety of animals in need of a loving home. Our goal is to make pet adoption more accessible, data-driven, and engaging.</p>
            <h5>What You Can Do on Pdopt</h5>
            <ul>
                <li>Browse Pets: Scroll through a diverse selection of adoptable dogs, cats, birds, rabbits, and other animals.</li>
                <li>Filter Results: Use advanced filters to narrow down your search by name, breed, type, gender, age, and size. You can even set custom size ranges.</li>
                <li>Explore Details: Click on any animal to view a comprehensive detail page with additional information, including contact details, behavioral traits, and an image of the pet.</li>
                <li>Get Data Insights: Visualize the pet data through interactive charts that give you a better understanding of the adoption pool. Learn about the age distribution of each animal type, and see which pet types are most available.</li>
                <li>Navigate Easily: Enjoy a consistent sidebar across all pages and direct links to each pet’s individual profile for easy sharing and navigation.</li>
            </ul>

            <h5>Designed With You in Mind</h5>
            <p>The dashboard includes charts that help users interpret the data visually. The platform also includes toggles to show or hide visualizations for a cleaner browsing experience, and a responsive design to ensure accessibility across all devices. Whether you’re an adopter, animal shelter worker, or data enthusiast, Pdopt is your gateway to understanding and connecting with animals in need.</p>
        </div>
    )
}

export default About;