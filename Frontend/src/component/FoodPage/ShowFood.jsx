import React, { useEffect, useState } from 'react';
import { Tooltip, tooltipClasses, styled } from "@mui/material";
import { IoLocationOutline } from "react-icons/io5";
import axios from 'axios';
import Review from './Review';
import Subscriptions from './Subscriptions';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[2],
    fontSize: 12,
    fontWeight: 'bold',
    padding: "8px 12px",
  },
}));

function ShowFood() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/foods/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching service provider:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!data) return <p className="text-center mt-5 text-danger">No service provider data found.</p>;

  return (
    <div className="container ">

      {/* Info + Image in two-column layout */}
      <div className="row mb-5 align-items-center">
        {/* Left: Info */}
        <div className="col-md-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="p-3"
          >
            <h1 className='fw-bold display-6 fs-2'>{data.user.name}</h1>
            <p className='fs-5 text-muted mb-1'>
              {data.reviews && data.reviews.length > 0
                    ? (data.reviews.reduce((sum, r) => sum + r.rating, 0) / data.reviews.length).toFixed(1)
                  : "0.0"} <i className="fa-solid fa-star text-warning"></i> Reviews
            </p>
            <LightTooltip title={data.tooltipLocation || data.user?.address} placement="top">
              <p className="fs-6 text-primary d-inline">
                <IoLocationOutline /> {data.user?.address || "No address"}
              </p>
            </LightTooltip>
            <p className='fs-6 text-muted mt-2'>
              {data.yearsInBusiness || "2"} Years in Business
            </p>
          </motion.div>
        </div>

        {/* Right: Image Grid */}
        <motion.div
          className="col-md-6 row g-2"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {data.imageUrls?.map((url, i) => (
            <div key={i} className='col-6'>
              <img
                src={url}
                className="img-fluid rounded shadow"
                alt={`Food ${i + 1}`}
                style={{ objectFit: "cover", height: "150px", width: "100%" }}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Description + Features + Price */}
      <motion.div
        className="card border-0 p-4 mb-4 shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <div className="row">
          <div className="col-md-8 border-end">
            <h4 className="mb-3">Description</h4>
            <p className="text-muted">{data.description || "No description provided."}</p>

            <h4 className="mt-4 mb-3">Features</h4>
            <ul className="mb-0">
              {data.features?.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
              {data.support && <li>Priority Support</li>}
            </ul>
          </div>

          <div className="col-md-4 d-flex flex-column justify-content-center align-items-center">
            <h4 className="mb-3">Price</h4>
            <p className='fs-2 fw-bold text-success'>₹{data.price || 0}</p>
            <div className="text-center mt-3">
                <button className="btn btn-success fs-5" onClick={() => navigate(`/foodshow/${id}/subscribe`)}>
                    Take Subscription
                </button>
            </div>

          </div>
        </div>
      </motion.div>

      {/* Menu Table */}
      <motion.div
        className="card shadow-lg border-0 p-4 mb-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h4 className="mb-3">Menu</h4>
        <div style={{ maxHeight: "350px", overflowY: "auto" }}>
          <table className="table table-bordered text-center">
            <thead className="table-dark text-white">
              <tr>
                <th>Day</th>
                <th>Date</th>
                <th>Lunch</th>
                <th>Dinner</th>
              </tr>
            </thead>
            <tbody>
              {data.menu?.map((day, index) => {
                const uploadDate = moment(data.createdAt);
                const menuDate = uploadDate.clone().add(index, 'days').format("ddd, DD MMM YYYY");
                return (
                  <tr key={index}>
                    <td>Day {index + 1}</td>
                    <td>{menuDate}</td>
                    <td>{day.lunch || "N/A"}</td>
                    <td>{day.dinner || "N/A"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Subscriptions & Reviews */}
      {/* <Subscriptions /> */}
      <Review />
    </div>
  );
}

export default ShowFood;
