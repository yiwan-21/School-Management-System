import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import "./Main.css";
import "./DashboardCard.css";
import DashboardCard from "./DashboardCard";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { routes } from "../constants/dashboardConstants";

const Main = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState();
  useEffect(() => {
    //  console.log("this is me upendra dhamala.")
    // await axios.get('/api/students/:classes')
    const fetchItems = async () => {
      setLoading(true);
      const { data } = await axios.get("/dashboard");
      setLoading(false);
      console.log(data);
      setItems(data);
    };
    fetchItems();
  }, []);

  return (
    <main className="bg-bg-school bg-cover bg-no-repeat bg-center w-full h-full">
      <div className="main__container min-w-full min-h-full pt-[70px] bg-gray-400 bg-opacity-75 items-center justify-center">
        {loading ? (
          <Loader />
        ) : (
          <div className="card-handler">
            {/* {loading? <Loader/
   {}>} */}
            {/* {console.log('dfsdf')} */}
            {/* {loading ? <Loader/>: } */}
            {/* {items.map((item) => (
              // <div key={item._id}>
              <DashboardCard
                key={item?._id}
                takeme={item?.takeme}
                title={item?.title}
                number={item?.number}
                image={item?.image}
              />
              // </div>
            ))} */}
            {routes.map((route, index) => (
              <Link key={index} to={route.path} className="route-link">
                <DashboardCard route={route} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Main;