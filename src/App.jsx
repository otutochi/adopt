import React, { useState, useEffect } from 'react'
import Page from './components/Page';

import './App.css'

const API_KEY = import.meta.env.VITE_PETFINDER_API_KEY;
const API_SECRET = import.meta.env.VITE_PETFINDER_API_SECRET;

function App() {

  

  const [token, setToken] = useState(null);
  const [tokenExpiration, setTokenExpiration] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const PAGE_LENGTH = 20;

  const [countDogs, setCountDogs] = useState(0);
  const [countCats, setCountCats] = useState(0);
  const [countBirds, setCountBirds] = useState(0);
  const [countRabbits, setCountRabbits] = useState(0);
  const [countOthers, setCountOthers] = useState(0);

  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const[filters, setFilters] = useState({
    name: "",
    breed: "",
    type: "",
    age: "",
    gender: "",
    size: "",
    minSize: "0",
    maxSize: "5"
  })


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
    console.log(combinedAnimals);
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

  const onNext = () => {

    if(page == numPages) {
      return;
    }
    setPage(prevPage => prevPage + 1);

  }

  const onPrev = () => {
    if(page == 1) {
      return;
    }
    setPage(prevPage => prevPage-1);
  }

  const getStats = () => {

    let dogs = 0, cats = 0, birds = 0, rabbits = 0, others = 0;

    for (const animal of animals) {
      if(animal.type == "Dog"){
        dogs++;
      } else if(animal.type == "Cat"){
        cats++;
      } else if(animal.type == "Bird"){
        birds++
      } else if(animal.type == "Rabbit"){
        rabbits++
      } else {
        others++
      }
    }

    setCountDogs(dogs);
    setCountCats(cats);
    setCountBirds(birds);
    setCountRabbits(rabbits);
    setCountOthers(others);


  }

  const handleFilterChange = (e) => {

    const { name, value } = e.target;
    setFilters((prevFilters)=> {
      const updatedFilters = {...prevFilters, [name]: value};
      return updatedFilters;
    })

  }

  const sizeOrder = {
    "Small" : 1,
    "Medium" : 2,
    "Large" : 3,
    "Extra Large" : 4
  }

  const filterAnimals = () => {
    let animalsToFilter = [...animals]

    const minSize = filters.minSize ? parseInt(filters.minSize) : 0;
    const maxSize = filters.maxSize ? parseInt(filters.maxSize) : 5;

    return animalsToFilter.filter((animal) => 

      (filters.name == "" || animal.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.breed == "" || animal.breeds.primary.toLowerCase().includes(filters.breed.toLowerCase())) && 
      (filters.type == "" || animal.type == filters.type) &&
      (filters.age == "" || animal.age == filters.age) &&
      (filters.gender == "" || animal.gender == filters.gender) &&
      (filters.size == "" || animal.size == filters.size) &&
      (sizeOrder[animal.size] >= minSize && sizeOrder[animal.size] <= maxSize)

    )
  }

  const onFilter = () => {

    const afterFilter = filterAnimals()
    setFilteredAnimals(afterFilter);
    setNumPages(Math.ceil((afterFilter.length)/PAGE_LENGTH)  || 1);
    setPage(1);
  }

  useEffect(() => {

    getStats();

  },[animals])

  useEffect(()=>{

    onFilter();

  }, [filters, animals]);
  

  return (
    <div className="App">
      <div className="sidebar">

        <h1>adopt</h1>

        <h3>Dashboard</h3>
        <h3>About</h3>
        <h3>Contact Us</h3>

      </div>
      <div className="main">

        <div className="statDiv">
          <div className="totalStat" >
            <p><strong>Total</strong></p>
            <p>{animals.length}</p>
          </div>
          <div className="dogStat" >
            <p><strong>Dogs</strong></p>
            <p>{countDogs}</p>
          </div>
          <div className="catStat" >
            <p><strong>Cats</strong></p>
            <p>{countCats}</p>
          </div>
          <div className="birdStat" >
            <p><strong>Birds</strong></p>
            <p>{countBirds}</p>
          </div>
          <div className="rabbitStat" >
            <p><strong>Rabbits</strong></p>
            <p>{countRabbits}</p>
          </div>
          <div className="otherStat" >
            <p><strong>Others</strong></p>
            <p>{countOthers}</p>
          </div>
        </div>

        <div className="filterDiv">

          <input
            type="text"
            name="name"
            placeholder="Search by name"
            value={filters.name}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="breed"
            placeholder="Search by breed"
            value={filters.breed}
            onChange={handleFilterChange}
          />
          <select name="type" value={filters.type} onChange={handleFilterChange}>
            <option value="">Select Type</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
            <option value="Rabbit">Rabbit</option>
          </select>
          <select name="gender" value={filters.gender} onChange={handleFilterChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <select name="age" value={filters.age} onChange={handleFilterChange}>
            <option value="">Select Age</option>
            <option value="Baby">Baby</option>
            <option value="Young">Young</option>
            <option value="Adult">Adult</option>
            <option value="Senior">Senior</option>
          </select>
          <select name="size" value={filters.size} onChange={handleFilterChange}>
            <option value="">Select Size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="Extra Large">Extra Large</option>
          </select>
          <select name="minSize" value={filters.minSize} onChange={handleFilterChange}>
            <option value="0">Select Min Size</option>
            <option value="1">Small</option>
            <option value="2">Medium</option>
            <option value="3">Large</option>
            <option value="4">Extra Large</option>
          </select>
          <select name="maxSize" value={filters.maxSize} onChange={handleFilterChange}>
            <option value="5">Select Max Size</option>
            <option value="1">Small</option>
            <option value="2">Medium</option>
            <option value="3">Large</option>
            <option value="4">Extra Large</option>
          </select>
          
          

        </div>

        <div className="Page">
          <Page  
            animals = {filteredAnimals}
            page = {page}
            pageLength = {PAGE_LENGTH}
            numPages = {numPages}
          />
        </div>
        <div className="pageNavDiv">
          <button onClick={onPrev} >Prev</button>
          <button onClick={onNext} >Next</button>
          <p>Page {page}/{numPages}</p>

        </div>

      </div>

      


      
    </div>
  )
}

export default App;