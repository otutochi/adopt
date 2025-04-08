import { Outlet, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_PETFINDER_API_KEY;
const API_SECRET = import.meta.env.VITE_PETFINDER_API_SECRET;

const Layout = () => {


    const [token, setToken] = useState(null);
    const [tokenExpiration, setTokenExpiration] = useState(null);
    const [animals, setAnimals] = useState([]);
    // const [page, setPage] = useState(1);
    // const [numPages, setNumPages] = useState(1);
    // const PAGE_LENGTH = 20;
    
    // const [countDogs, setCountDogs] = useState(0);
    // const [countCats, setCountCats] = useState(0);
    // const [countBirds, setCountBirds] = useState(0);
    // const [countRabbits, setCountRabbits] = useState(0);
    // const [countOthers, setCountOthers] = useState(0);
    
    // const [filteredAnimals, setFilteredAnimals] = useState([]);
    // const[filters, setFilters] = useState({
    //     name: "",
    //     breed: "",
    //     type: "",
    //     age: "",
    //     gender: "",
    //     size: "",
    //     minSize: "0",
    //     maxSize: "5"
    // })
    
    
    const getAccessToken = async () => {
    
        if (token && tokenExpiration > Date.now()) {
          return token; 
        }
    
        const url = "https://api.petfinder.com/v2/oauth2/token";
        const response_type = {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: API_KEY,
            client_secret: API_SECRET
          })
        }
    
        try {
          const response = await fetch(url, response_type);
    
          if (!response.ok) throw new Error(`Token request failed: ${response.status}`);
    
          const data = await response.json();
          setToken(data.access_token);
          setTokenExpiration(Date.now() + data.expires_in * 1000);
    
          return data.access_token;
        } catch(error) {
          console.error("Error fetching access token: ", error);
          return null;
        }
    
    }
    
    const getAnimals = async (type = null) => {
        const accessToken = await getAccessToken();
        if (!accessToken) return [];
        
        let url = "https://api.petfinder.com/v2/animals?limit=10";
        if (type) url += `&type=${type}`;
        const response_type = {
          method: "GET",
          headers: { "Authorization" : `Bearer ${accessToken}` }
        };
    
        try {
          const response = await fetch(url, response_type);
          if (!response.ok) throw new Error(`Animal request failed: ${response.status}`);
          const data = await response.json();
          console.log(data.animals);
          return data.animals;
        } catch(error) {
          console.error("Error fetching animals: ", error);
          return [];
        }
    }
    
    const fetchAllAnimals = async () => {
        const any = await getAnimals();
        const dogs = await getAnimals("Dog");
        const cats = await getAnimals("Cat");
        const birds = await getAnimals("Bird");
        const rabbits = await getAnimals("Rabbit");
    
        const combinedAnimals = [...any, ...dogs, ...cats, ...birds, ...rabbits];
        // console.log(combinedAnimals);
        return shuffleArray(combinedAnimals);
    }
    
    const displayAnimals = async () => {
        const myAnimals = await fetchAllAnimals();
        setAnimals(myAnimals);
        //setNumPages(Math.ceil((myAnimals.length)/PAGE_LENGTH));
    }
    
    const shuffleArray = (array) => {
        
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1)); 
          [array[i], array[j]] = [array[j], array[i]]; 
        }
        return array;
    };
    
    useEffect(()=>{
        displayAnimals();
    }, [])
    
    // const onNext = () => {
    
    //     if(page == numPages) {
    //       return;
    //     }
    //     setPage(prevPage => prevPage + 1);
    
    // }
    
    // const onPrev = () => {
    //     if(page == 1) {
    //       return;
    //     }
    //     setPage(prevPage => prevPage-1);
    // }
    
    // const getStats = () => {
    
    //     let dogs = 0, cats = 0, birds = 0, rabbits = 0, others = 0;
    
    //     for (const animal of animals) {
    //       if(animal.type == "Dog"){
    //         dogs++;
    //       } else if(animal.type == "Cat"){
    //         cats++;
    //       } else if(animal.type == "Bird"){
    //         birds++
    //       } else if(animal.type == "Rabbit"){
    //         rabbits++
    //       } else {
    //         others++
    //       }
    //     }
    
    //     setCountDogs(dogs);
    //     setCountCats(cats);
    //     setCountBirds(birds);
    //     setCountRabbits(rabbits);
    //     setCountOthers(others);
    
    
    // }
    
    // const handleFilterChange = (e) => {
    
    //     const { name, value } = e.target;
    //     setFilters((prevFilters)=> {
    //       const updatedFilters = {...prevFilters, [name]: value};
    //       return updatedFilters;
    //     })
    
    // }
    
    // const sizeOrder = {
    //     "Small" : 1,
    //     "Medium" : 2,
    //     "Large" : 3,
    //     "Extra Large" : 4
    // }
    
    // const filterAnimals = () => {
    //     let animalsToFilter = [...animals]
    
    //     const minSize = filters.minSize ? parseInt(filters.minSize) : 0;
    //     const maxSize = filters.maxSize ? parseInt(filters.maxSize) : 5;
    
    //     return animalsToFilter.filter((animal) => 
    
    //       (filters.name == "" || animal.name.toLowerCase().includes(filters.name.toLowerCase())) &&
    //       (filters.breed == "" || animal.breeds.primary.toLowerCase().includes(filters.breed.toLowerCase())) && 
    //       (filters.type == "" || animal.type == filters.type) &&
    //       (filters.age == "" || animal.age == filters.age) &&
    //       (filters.gender == "" || animal.gender == filters.gender) &&
    //       (filters.size == "" || animal.size == filters.size) &&
    //       (sizeOrder[animal.size] >= minSize && sizeOrder[animal.size] <= maxSize)
    
    //     )
    // }
    
    // const onFilter = () => {
    
    //     const afterFilter = filterAnimals()
    //     setFilteredAnimals(afterFilter);
    //     setNumPages(Math.ceil((afterFilter.length)/PAGE_LENGTH)  || 1);
    //     setPage(1);
    // }
    
    // useEffect(() => {
    
    //     getStats();
    
    // },[animals])
    
    // useEffect(()=>{
    
    //     onFilter();
    
    // }, [filters, animals]);




    return (
        <div className="App" >

            <div className="sidebar" >
                <h1>adopt</h1>

                <Link to="/" ><h3>Home</h3></Link>
                {/* <h3>Dashboard</h3> */}
                <Link to="/about"><h3>About</h3></Link>
                <h3>Contact Us</h3>
            </div>

            { animals ? <Outlet context={{animals}} /> : <p>Loading...</p> }

        </div>
    )
}

export default Layout;