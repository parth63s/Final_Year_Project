import React, { useEffect, useState } from 'react';
import { RatingStarReadOnly, RatingStar } from './RatingStar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Star } from '@mui/icons-material';

function Review() {
  const { id } = useParams(); // foodId
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/reviews/${id}`);
        setReviews(res.data);

        if (res.data.length > 0) {
          const total = res.data.reduce((sum, r) => sum + r.rating, 0);
          setAvgRating((total / res.data.length).toFixed(1));
        }
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };
    fetchReviews();
  }, [id]);

  return (
    <div className="container mt-5">
      <h1 className="fs-4 fw-bold mb-4">Reviews & Ratings</h1>

      {/* Average Rating Summary */}
      <div className="row align-items-center bg-light p-4 rounded shadow-sm mb-5">
        <div className="col-md-3 text-center border-end">
          <h1 className="fs-1 text-primary">{avgRating || 0}</h1>
          <p className="text-muted">Average Rating</p>
        </div>
        <div className="col-md-9">
          <h5 className="mb-1">{reviews.length} Ratings</h5>
          <p className="text-muted mb-2">Based on customer feedback</p>
          <RatingStarReadOnly rating={parseFloat(avgRating)} />
        </div>
      </div>

      {/* Leave a Review */}
      <div className="mb-4">
        <h2 className="fs-5 mb-2">Start Your Review</h2>
        <RatingStar />
      </div>

      {/* User Reviews */}
      <div className="mt-4">
        <h2 className="fs-5 mb-3">User Reviews</h2>
        {reviews.length === 0 && <p>No reviews yet.</p>}

        <div className="row">
          {reviews.map((review, index) => (
            <div key={index} className="col-md-6 mb-3">
              <motion.div
                className="card mb-2 shadow-sm border-25 h-100 p-2"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <div className="d-flex align-items-center">
                      <img
                        src={review.plan.imageUrls[0]}
                        alt="user"
                        className="rounded-circle me-2"
                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                      />
                      <h6 className="mb-0">{review.user?.name || 'Anonymous'}</h6>
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
                  <p className="mb-2 text-start">Feedback : {review.feedback}</p>
                  <div className="d-flex flex-wrap">
                    {review.tags.map((tag, i) => (
                      <span key={i} className="badge bg-success me-2 mb-1">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Review;
