import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <div className="image-section">
        <div className="image-text">
          <div className='heading'>
            Welcome <br/> To <br/> DMCE CONCESSIONS <br/>
          </div>
          <p>Get Railway Concession Online!</p>
          <br/>
          <Link to="/Signup" className="signup-button">Sign Up</Link>
        </div>
      </div>

      <br/>

      <div className="announcement-section">
        <div className="announcement-text">
          <b><b>Important Announcement:</b>  Concessions will be provided only after Admissions.</b>
          <br/>
        </div>
      </div>

      <div className="text-boxes-container">
        <div className="text-box-out">
          <div className='heading-notice'>
            Notice : Requirements
          </div>
          <div>
            <p><b>1.</b> Current (original) fee reciept
              <br/>
              <b>2.</b>Aadhar card (masked)
              <br/>
              <b>3.</b>User's photo
              <br/>
              <b>4.</b>College ID [front and back]
              <br/>
              <b>5.</b>Previous pass
              <br/>
              <b>The scanned image should be readable</b>
              <br/>
            </p>
          </div>
        </div>
        <div className="text-box-out">
          <div className='heading-notice'>
            Notice : Aadhaar
          </div>
          <div>
            <p><b>1.</b>Provide only masked Aadhar for verification
              <br/>
              <b>2.</b><a href="https://www.youtube.com/watch?v=CpXwrTwfLwg" target="_blank" rel="noopener noreferrer">How to Generate masked Aadhar</a>
              <br/>
              <b>2.</b><a href="https://myaadhaar.uidai.gov.in/genricDownloadAadhaar" target="_blank" rel="noopener noreferrer">Download Generate masked Aadhar</a>
              <br/>
              <b>4.</b>We are not liable for loss of Aadhar number
            </p>
          </div>
        </div>
        <div className="text-box-out">
          <div className='heading-notice'>
            Notice : Process
          </div>
          <div>
            <p><b>1.</b>One can only issue concession once profile is verified
              <br/>
              <b>2.</b>Read carefully the Fields asked before uploading
              <br/>
              <b>3.</b>Concession must be availed within 3 days
            </p>
          </div>
        </div>
        <div className="text-box-out">
          <div className='heading-notice'>
            Notice : College 
          </div>
          <div>
            <p><b>1.</b>The website is underdevelopment , report bugs!
              <br/>
              <b>2.</b>Logithon is held in college
              <br/>
              <b>3.</b>AI spark is held in college
              <br/>
              <b>4.</b>If u face any issues please use it on laptop or PC
              <br/>
            </p>
          </div>
        </div>
      </div>

      <div className="map-view">
        <iframe
          title="Map View"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.7967111727576!2d72.99298087520746!3d19.160373882061627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7bf4daf8967d9%3A0xdd90bed2058f7eaa!2sDatta%20Meghe%20College%20Of%20Engineering!5e0!3m2!1sen!2sin!4v1713338592057!5m2!1sen!2sin"
          width="400"
          height="400"
          style={{ border: '0' }}
          allowFullScreen
          loading="lazy">
        </iframe>
      </div>

      <div className="footer">
        <b>&copy; All rights reserved.</b>
      </div>
    </div>
  );
}

export default Home;
