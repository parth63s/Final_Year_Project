import React, { useState, useRef } from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const ReviewsList = [
    { rating: 1, Question: "What went wrong?", ListOfQuery: ["Missing food items", "Slow service", "Small portions", "Expensive", "Stale food", "Inferior quality"] },
    { rating: 2, Question: "What went wrong?", ListOfQuery: ["Small portions", "Expensive", "Untrained staff", "Missing food items", "Unsatisfactory presentation", "Inferior quality"] },
    { rating: 3, Question: "What did you like and dislike?", ListOfQuery: ["Authentic cuisine", "Tasty food", "Stale food", "Inferior quality", "Reasonably priced", "Generous portion size"] },
    { rating: 4, Question: "What did you like and dislike?", ListOfQuery: ["Authentic cuisine", "Fresh food", "Inferior quality", "Unsatisfactory presentation", "Good quantity", "Generous portion size"] },
    { rating: 5, Question: "What did you love?", ListOfQuery: ["Fast delivery", "Great service", "Fresh food", "Tasty food", "Generous portion size", "Reasonably priced"] },
];

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

function ReviewPage() {
    const fileInputRef = useRef(null);
    const [value, setValue] = useState(1);
    const [hover, setHover] = useState(-1);
    const [selectedQueries, setSelectedQueries] = useState([]);

    const uploadFile = () => {
        fileInputRef.current.click();
    };

    const toggleQuery = (query) => {
        setSelectedQueries((prev) =>
            prev.includes(query) ? prev.filter((item) => item !== query) : [...prev, query]
        );
    };

    const reviewIndex = value - 1 >= 0 && value - 1 < ReviewsList.length ? value - 1 : 0;

    return (
        <>
            <NavBar />
            <div className="container mb-4 review-box">
                <h1 className='fs-4'>Write Review</h1>
                <hr />
                <div className="row p-4">
                    <div className="col border-50 bottom-remove p-lg-4 p-sm-4 p-md-4 rounded-left">
                        <div className='row mb-3'>
                            <img className='col-3 p-2 rounded' src="/media/images/Food1.jpg" alt="Food" />
                            <div className='col p-2'>
                                <h1 className='fs-5'>Title</h1>
                                <p>Location</p>
                            </div>
                        </div>
                        <h1 className='fs-5 mb-3'>How would you rate your experience?</h1>
                        <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
                            <Rating
                                size='large'
                                name="hover-feedback"
                                value={value}
                                precision={1}
                                onChange={(event, newValue) => setValue(newValue)}
                                onChangeActive={(event, newHover) => setHover(newHover)}
                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                            />
                            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                        </Box>
                        <hr />
                    </div>
                    <div className="col p-lg-4 p-sm-4 p-md-4 p-4 border bottom-remove rounded-top">
                        <p className='fs-4 '>{ReviewsList[reviewIndex].Question}</p>
                        {ReviewsList[reviewIndex].ListOfQuery.map((item, index) => (
                            <p key={index} className="d-inline-flex gap-1">
                                <button
                                    type="button"
                                    className={`btn m-1 ${selectedQueries.includes(item) ? 'btn-primary' : 'border'}`}
                                    onClick={() => toggleQuery(item)}
                                >
                                    {item}
                                </button>
                            </p>
                        ))}
                        <p className='fs-4'>Tell us about your experience</p>
                        <textarea className='p-2 mt-2 review-text-box' placeholder="Write your review..." />
                        <p className='fs-4 mt-4'>Upload Photos</p>
                        <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
                        <div className='upload-image mt-4' onClick={uploadFile}></div>
                        <p className='btn btn-primary px-4 fs-5 mt-5 mb-5'>Submit Review</p>
                    </div>
                </div>
                <hr />
            </div>
            <Footer />
        </>
    );
}

export default ReviewPage;
