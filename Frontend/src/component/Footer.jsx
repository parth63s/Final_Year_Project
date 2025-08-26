import React from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Twitter, Facebook, LinkedIn, YouTube } from "@mui/icons-material";
import "./footer.css";


function Footer(value) {
    return ( 
        <footer style={{ backgroundColor: "#3a3a3e", color: "white", padding: "20px 0" }} className='mt-4'>
            <div className='mt-4' style={{ textAlign: "center", marginBottom: "20px" }}>
                <h6 className='mb-4'>Subscribe to our newsletter</h6>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <input type="email" placeholder="Input your email" style={{ padding: "7px", width: "250px", border: "1px solid #ccc", borderRadius:"1rem 0 0 1rem" }} />
                    <button style={{ backgroundColor: "#6366f1", color: "white", padding: "8px 15px", border: "none", cursor: "pointer", borderRadius:"0 1rem 1rem 0" }}>Subscribe</button>
                </div>
            </div>
        <div className='footer-container'>
            <div className="row mt-4">
                <div className="row row-cols-md-2 row-cols-lg-2 row-cols-sm-1">
                    <h5 className='col'><span role="img" aria-label="chat">💬</span> Service Scout</h5>
                    <div className='col'>
                        <a className='footer-items' href="#" >Pricing</a>
                        <a className='footer-items' href="#" >About us</a>
                        <a className='footer-items' href="#" >Features</a>
                        <a className='footer-items' href="#" >Help Center</a>
                        <a className='footer-items' href="#" >Contact us</a>
                        <a className='footer-items' href="#" >FAQs</a>
                        <a className='footer-items' href="#" style={{ color: "white" }}>Careers</a>
                    </div>
                </div>
                <hr className='my-2'/>
                <div className='row row-cols-1 row-cols-md-3 row-cols-lg-3 row-cols-sm-3'>
                    <div className="col text-center text-sm-start text-md-start text-lg-start" style={{ marginBottom: "20px" }}>
                        <select style={{ padding: "5px", borderRadius: "5px" }}>
                            <option>English</option>
                            <option>Spanish</option>
                        </select>
                    </div>
                    <div className="col" style={{ textAlign: "center", marginBottom: "10px" }}>
                        <p>&copy; 2024 Brand, Inc. • <a href="#" style={{ color: "white" }}>Privacy</a> • <a href="#" style={{ color: "white" }}>Terms</a> • <a href="#" style={{ color: "white" }}>Sitemap</a></p>
                    </div>
                    <div className='col text-center text-sm-end text-md-end text-lg-end'>
                        <Twitter style={{ marginRight: "10px", color:"lightblue" }} />
                        <Facebook style={{ marginRight: "10px", color: "blue" }} />
                        <LinkedIn style={{ marginRight: "10px", color: "blueviolet" }} />
                        <YouTube style={{ color: "red"}}/>
                    </div>
                </div>
            </div>
        </div>
      </footer>
     );
}

export default Footer;