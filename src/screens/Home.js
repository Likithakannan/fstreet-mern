import React,{ useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import Cards from "../components/Cards";
import Footer from "../components/Footer";

export default function Home() {
  const [foodItems,setFoodItems] = useState([])
  const [foodCat,setFoodCat] = useState([])
  const [search,setSearch] = useState("")

  let loadData = async ()=>{
    let response = await fetch("http://localhost:5000/api/displaydata", {
      method : "POST",
      headers:{
        'Content-Type': 'application/json'
      }
    });
    response = await response.json()
    setFoodCat(response[1])
    setFoodItems(response[0])
  }  

  useEffect(() => {
    loadData();
  },[])
  
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div ><div
      id="carouselExampleFade"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      <div
        className="carousel-inner"
        id="carousel"
        style={{ objectFit: "cover !important" }}
      >
        <div className="carousel-caption d-none d-md-block">
          <div className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              value={search}
              placeholder="Search"
              aria-label="Search"
              style={{ zIndex: "10" }} onChange={(e)=>{setSearch(e.target.value)}}
            />
          </div>
        </div>
        <div className="carousel-item active">
          <img
            src="https://source.unsplash.com/random/700×500/?pasta"
            className="d-block w-100"
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://source.unsplash.com/random/700×500/?pizza"
            className="d-block w-100"
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://source.unsplash.com/random/700×500/?sandwich"
            className="d-block w-100"
            alt="..."
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div></div>
      <div className="container">
        {
          foodCat != [] ? foodCat.map((data)=>{
            return(
              <div className="row mb-3">
              <div className="fs-2" key={data._id}>{data.CategoryName} <hr /></div>
              {foodItems != [] ? foodItems.filter((items) => (items.CategoryName === data.CategoryName && items.name.toLowerCase().includes(search.toLocaleLowerCase()))).map((filteredItems)=>{
                return(
                  <div key={filteredItems._id} className="col-12 col-md-6 col-lg-4">
                    <Cards info={filteredItems} /> 
                  </div>
                )
              }): "Record not found"
              }
              </div>
            )
          }): "Record not found"
        }
        </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
