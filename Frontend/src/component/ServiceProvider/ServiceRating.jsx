import React, { useEffect, useState } from 'react';
import { Star } from '@mui/icons-material';
import axios from 'axios';
import { motion } from 'framer-motion';

function ServiceRating() {
  const [userPlans, setUserPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("all");

  useEffect(() => {
    const fetchUserPlans = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/reviews/', {
          withCredentials: true,
        });
        setUserPlans(res.data);
      } catch (error) {
        console.error('Error fetching user reviews:', error);
      }
    };
    fetchUserPlans();
  }, []);

  
  const handlePlanChange = (e) => {
    setSelectedPlan(e.target.value);
  };
  
  const filteredPlans = selectedPlan === "all" ? userPlans : userPlans.filter((plan) => plan.name === selectedPlan);
  
  let totalRating = 0;
  let totalReviews = 0;

  filteredPlans.forEach(plan => {
    if (plan.reviews && plan.reviews.length > 0) {
      plan.reviews.forEach(review => {
        totalRating += review.rating;
        totalReviews++;
      });
    }
  });

  // console.log(userPlans);
  return (
    <section className="dashboard-section">
      <div className="row">
        <div className="col-md-4">
          <div className="card rating-card">
            <div className="card-body">
              <h5 className="card-title">
                <Star className="text-warning me-2" />
                Overall Rating
              </h5>
              <div className="rating-value">{(totalRating / totalReviews || 0).toFixed(1)}</div>
              <div className="rating-count">
                Based on {totalReviews} reviews
              </div>
            </div>
          </div>
          <div className="mt-3 mb-3">
            <label htmlFor="planReviewSelect" className="form-label fw-semibold text-primary">
              Filter by Plan
            </label>
            <select
              id="planReviewSelect"
              className="form-select border-primary shadow-sm rounded-3 p-3"
              aria-label="Select plan review"
              value={selectedPlan}
              onChange={handlePlanChange}
            >
              <option value="all" className="text-muted">
                All Plan Reviews
              </option>
              {userPlans.map((plan, index) => (
                <option key={index} value={plan.name}>
                  {plan.name} Reviews
                </option>
              ))}
            </select>
          </div>

        </div>

        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Recent Reviews</h5>
              <div
                className="reviews-list"
                style={{ 
                  maxHeight: '320px',  
                  overflowY: 'auto',
                  paddingRight: '10px' 
                }}
              >
                {filteredPlans.map((plan, planIndex) => (
                  <div key={planIndex} className="mb-4">
                    <h6 className="text-primary mb-2">{plan.name} Plan</h6>

                    {plan.reviews && plan.reviews.length > 0 ? (
                      plan.reviews.map((review, index) => (
                        <motion.div
                          key={index}
                          className="card mb-3 shadow-sm p-2"
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.1 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <div className="d-flex align-items-center">
                                <img
                                  src={plan.imageUrls[0]}
                                  alt="user"
                                  className="rounded-circle me-2"
                                  style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                />
                                <div>
                                  <h6 className="mb-0">{review.user?.name || 'Anonymous'}</h6>
                                  <small className="text-muted">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                  </small>
                                </div>
                              </div>
                              <div className="review-rating">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={i < review.rating ? 'text-warning' : 'text-muted'}
                                    fontSize="small"
                                  />
                                ))}
                              </div>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                              <div>
                                <p className="mb-2 text-start">Feedback: {review.feedback}</p>
                                <div className="d-flex flex-wrap">
                                  {review.tags.map((tag, i) => (
                                    <span key={i} className="badge bg-success me-2 mb-1">{tag}</span>
                                  ))}
                                </div>
                              </div>
                              {/* <p>{review.imageUrl}</p> */}
                              <img src={review.imageUrl} alt="" style={{ marginTop: "5px", width: "20%", objectFit: "cover" }}/>
                            
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-muted">No reviews for this plan.</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceRating;
