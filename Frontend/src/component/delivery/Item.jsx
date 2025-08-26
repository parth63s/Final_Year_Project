import React, { useContext, useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import { OnlineStatusContext } from "./OnlineStatusContext";
import axios from "axios";

import { toast } from "react-toastify";


const getPickupTime = (slot) => {
  if (!slot) return "";
  const [startTime] = slot.split(" - ");
  const date = new Date(`1970-01-01 ${startTime}`);
  date.setMinutes(date.getMinutes() - 30);
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) + " - " + startTime;
};

const isWithinDeliveryWindow = (slot) => {
  if (!slot) return false;
  const [startTime, endTime] = slot.split(" - ");
  const now = new Date();
  const today = now.toDateString();
  const startDate = new Date(`${today} ${startTime}`);
  const endDate = new Date(`${today} ${endTime}`);
  startDate.setMinutes(startDate.getMinutes() - 30);
  return now >= startDate && now <= endDate;
};

const Item = () => {
  const { isOnline } = useContext(OnlineStatusContext);
  const [deliveries, setDeliveries] = useState([]);

  // Fetch today's deliveries from backend
  useEffect(() => {
       const fetchData = async () => {
        try {
          // await axios.post("http://localhost:5000/api/delivery/create-today-for-all");
          const res = await axios.get("http://localhost:5000/api/delivery/today", {
            withCredentials: true
          });
          setDeliveries(res.data);
        } catch (err) {
          console.error("Error fetching deliveries:", err.response?.data || err.message);
        }
      };
      
      fetchData();
    }, []);
    console.log(deliveries);

  const updateDeliveryStatus = async (deliveryId, action) => {
        try {
          const res = await axios.put(
            `http://localhost:5000/api/delivery/${action}/${deliveryId}`,
            {},
            { withCredentials: true }
          );

          // update in frontend state
          setDeliveries((prev) =>
            prev.map((delivery) =>
              delivery._id === deliveryId ? { ...delivery, status: res.data.delivery.status } : delivery
            )
          );

           toast.success(res.data.message, {
              position: "top-right",
              autoClose: 2000, // 2 seconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
        } catch (err) {
          toast.error(err.response?.data?.message || "Error updating delivery", {
            position: "top-right",
            autoClose: 2000,
            
          });

        }
      };

  return (
    <div className="container delivery-margin mt-4">
      {deliveries.map((delivery) => (
        <div key={delivery._id} className="card mb-3 p-3 shadow">
          <div className="row">
            {/* Customer Details */}
            <div className="col-md-4">
              <h5 className="mb-3">Customer Details</h5>
              <p className="d-flex delivery-margin-icon">
                <p className="p-3 delivery-icon"><PersonIcon /></p>
                <div className="m-2 text">
                  {delivery.subscriptionId.user.name} <br />
                  <small>Customer Name</small>
                </div>
              </p>
              <p className="d-flex delivery-margin-icon">
                <p className="p-3 delivery-icon"><PhoneIcon /></p>
                <div className="m-2 text">
                  {delivery.subscriptionId.user.phone} <br />
                  <small>Phone</small>
                </div>
              </p>
              <p className="d-flex delivery-margin-icon">
                <p className="p-3 delivery-icon"><EmailIcon /></p>
                <div className="m-2 text">
                  {delivery.subscriptionId.user.email} <br />
                  <small>Email</small>
                </div>
              </p>
              <p className="d-flex delivery-margin-icon">
                <p className="p-3 delivery-icon"><LocationOnIcon /></p>
                <div className="m-2 text">
                  {delivery.subscriptionId.user.address} <br />
                  <small>Delivery Address</small>
                </div>
              </p>
            </div>

            {/* Delivery Schedule */}
            <div className="col-md-4">
              <h5 className="mb-3">Delivery Schedule</h5>
              <p className="d-flex delivery-margin-icon">
                    <p className="p-3 delivery-icon"><LocationOnIcon /></p>
                    <div className="m-2 text">
                      {delivery.subscriptionId.plan.user.kitchenName} <br />
                      <small>{delivery.subscriptionId.user.address}</small>
                    </div>
                </p>

                <p className="d-flex delivery-margin-icon">
                    <p className="p-3 delivery-icon"><PhoneIcon /></p>
                    <div className="m-2 text">
                      {delivery.subscriptionId.plan.user.phone} <br />
                      <small>Phone Name</small>
                    </div>
                </p>
              <p className="d-flex delivery-margin-icon">
                <p className="p-3 delivery-icon"><AccessTimeIcon /></p>
                <div className="m-2 text">
                  Pickup: {getPickupTime(delivery.slotTime)}<br />
                  <small>Delivery: {delivery.slotTime}</small>
                </div>
              </p>
              <p className="d-flex delivery-margin-icon">
                <p className="p-3 delivery-icon"><DeliveryDiningIcon /></p>
                <div className="m-2 text">
                    {delivery.subscriptionId.slotType}  {
                      delivery.subscriptionId.plan.duration === 3
                        ? "Trial Premium"
                        : delivery.subscriptionId.plan.duration === 7
                        ? "Weekly Premium"
                        : delivery.subscriptionId.plan.duration === 30
                        ? "Monthly Premium"
                        : ""
                    }

                  <br />
                    <small>
                      {new Date(delivery.subscriptionId.startDate).toLocaleDateString()} - {new Date(delivery.subscriptionId.endDate).toLocaleDateString()}
                    </small>
                </div>
              </p>
            </div>
            



            {/* Map & Actions */}
            <div className="col-md-4 text-center">
              <h5>Route & Actions</h5>
              <iframe
                src={delivery.mapUrl}
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title={`Map-${delivery._id}`}
              ></iframe>
              <div className="row mt-3 p-3">
                <button
                    className={`btn btn-primary delivery-btn ${!isOnline || delivery.status === "delivered" ? "btn-secondary" : ""} col m-1 shadow`}
                    disabled={!isOnline || delivery.status === "delivered" || !isWithinDeliveryWindow(delivery.slotTime)}
                    onClick={() =>
                      updateDeliveryStatus(delivery._id,
                        delivery.status === "start_delivery" ? "start-delivery" : "mark-delivered"
                      )
                    }
                  >
                    {delivery.status === "start_delivery"
                      ? "Start Delivery"
                      : delivery.status === "pending"
                      ? "Mark Delivered"
                      : "Delivered"}
                  </button>

                <button
                  className="btn btn-outline-danger col m-1"
                  onClick={() => window.open(delivery.mapUrl, "_blank")}
                >
                  Open Map
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Item;
