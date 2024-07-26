import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fireapp } from './firebase';
import 'firebase/storage';
import './Profileinformation.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Personalinformation() {

  const navigate = useNavigate();

  // State variables to store input values
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [admissionDate, setAdmissionDate] = useState(null);
  const [branchName, setBranchName] = useState('');
  const [year, setYear] = useState('');
  const [grNumber, setGrNumber] = useState('');
  const [division, setDivision] = useState('');
  const [photo, setPhoto] = useState(null);
  const [aadharCard, setAadharCard] = useState(null);
  const [collegeId, setCollegeId] = useState(null);
  const [feeReceipt, setFeeReceipt] = useState(null);
  const [signature, setSignature] = useState(null);


  const handleGrNumberInput = (e) => {
    const inputValue = e.target.value.toUpperCase(); // Convert to uppercase
    setGrNumber(inputValue); // Update grNumber state
  };

  const handleNumberInput = (e) => {
    const inputValue = e.target.value;
    if (/[^0-9\b]/.test(inputValue)) {
      e.preventDefault();
    } else {
      setMobileNumber(inputValue); // Update mobileNumber state
    }
  };


  const handleFileChange = (e, setter) => {
    const file = e.target.files[0];
    setter(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = fireapp.auth().currentUser;
    if (!user) {
      return; // Exit early if user is not authenticated
    }
  
    // Check if any required field is empty
    if (!firstName || !lastName || !mobileNumber || !address || !admissionDate || !branchName || !year || !grNumber || !division || !photo || !aadharCard || !collegeId || !feeReceipt || !signature) {
      alert('Please fill in all required fields.');
      return; // Exit if any required field is empty
    }
  
    const uid = user.uid;
    await fireapp.firestore().collection('users').doc(uid).set({
      firstName: firstName,
      lastName: lastName,
      mobileNumber: mobileNumber,
      address: address,
      admissionDate: admissionDate,
      branchName: branchName,
      year: year,
      grNumber: grNumber,
      division: division,
      comment: 'Ongoing',
      is_admin: 0,
      is_verified: 0,
      to_show: 1,
      accept: 0,
      reject: 0
    });
  
    const storageRef = fireapp.storage().ref();
    const userFolderRef = storageRef.child(`users/${user.uid}`);
  
    try {
      // Upload photo
      const photoRef = userFolderRef.child('photo.jpg');
      await photoRef.put(photo);
      const photoUrl = await photoRef.getDownloadURL();
      await fireapp.firestore().collection('users').doc(user.uid).update({ photoUrl: photoUrl });
  
      // Upload Aadhar card
      const aadharRef = userFolderRef.child('aadharCard.jpg');
      await aadharRef.put(aadharCard);
      const aadharUrl = await aadharRef.getDownloadURL();
      await fireapp.firestore().collection('users').doc(user.uid).update({ aadharUrl: aadharUrl });
  
      // Upload college ID
      const idRef = userFolderRef.child('collegeId.jpg');
      await idRef.put(collegeId);
      const idUrl = await idRef.getDownloadURL();
      await fireapp.firestore().collection('users').doc(user.uid).update({ idUrl: idUrl });
  
      // Upload fee receipt
      const feeRef = userFolderRef.child('feeReceipt.jpg');
      await feeRef.put(feeReceipt);
      const feeUrl = await feeRef.getDownloadURL();
      await fireapp.firestore().collection('users').doc(user.uid).update({ feeUrl: feeUrl });
  
      // Upload signature
      const signRef = userFolderRef.child('signature.jpg');
      await signRef.put(signature);
      const signUrl = await signRef.getDownloadURL();
      await fireapp.firestore().collection('users').doc(user.uid).update({ signUrl: signUrl });
  
      // Reset file states after upload
      setPhoto(null);
      setAadharCard(null);
      setCollegeId(null);
      setFeeReceipt(null);
      setSignature(null);
  
      alert('Profile created!');
      navigate('/');
    } catch (error) {
      console.error('Error uploading files: ', error);
      alert('Error uploading files. Please try again.');
    }
  };



  return (

    <div>
      <div className="text-box-Profile-info">
        <h1>Personal Information</h1>
        <div>
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            id="firstName"
            placeholder="Enter First Name"
            value={firstName}
            required
            onChange={(e) => setFirstName(e.target.value)}/>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            placeholder="Enter Last Name"
            value={lastName}
            required
            onChange={(e) => setLastName(e.target.value)} />
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="text"
            id="mobileNumber"
            placeholder="Enter Mobile Number"
            value={mobileNumber}
            required
            onChange={handleNumberInput}/>
          <label htmlFor="address">Address:</label>
          <textarea
            className="address"
            id="address"
            placeholder="Enter Address"
            rows="2"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <br /> <br /> <br /> <br/>
          <h1>Academic Information</h1>
        </div>
        <label htmlFor="branchName">Branch Name:</label>
        <select
          id="branchName"
          className="alignment"
          value={branchName}
          required
          onChange={(e) => setBranchName(e.target.value)}>
          <option value="">Select Branch</option>
          <option value="AI-DS">AI-DS</option>
          <option value="COMP">COMP</option>
          <option value="IT">IT</option>
          <option value="ELEX">ELEX</option>
          <option value="CIVIL">CIVIL</option>
          <option value="CIVIL-INFRA">CIVIL-INFRA</option>
          <option value="MECH">MECH</option>
          <option value="CHEM">CHEM</option>
        </select>
        <br/>
        <label htmlFor="Year">Year:</label>
        <select
          id="Year"
          className="alignment"
          value={year}
          required
          onChange={(e) => setYear(e.target.value)}>
          <option value="">Select Year</option>
          <option value="FE">FE</option>
          <option value="SE">SE</option>
          <option value="TE">TE</option>
          <option value="BE">BE</option>
        </select>
        <br/>
        <label htmlFor="grNumber">GR number: </label>
        <input
          type="text"
          id="grNumber"
          placeholder="Enter Your GR Number"
          value={grNumber}
          required
          onChange={handleGrNumberInput} />
        <br/>
        <label htmlFor="admissionDate">Year of Admission:</label>
        <DatePicker
          id="admissionDate"
          selected={admissionDate}
          required
          onChange={(date) => setAdmissionDate(date)}
          dateFormat="yyyy-MM-dd"/>
        <br/>
        <label htmlFor="Division">Division:</label>
        <select
          id="Division"
          className="alignment"
          required
          value={division}
          onChange={(e) => setDivision(e.target.value)}>
          <option value="">Select Division</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
        <br/>
        <div/>
        <br/><br/>
        <h1>Important Documents</h1>
        <div>
          <label htmlFor="photo">Photo:</label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            required
            onChange={(e) => handleFileChange(e, setPhoto)} />
        </div>
        <div>
          <label htmlFor="aadharCard">Aadhar card:</label>
          <input
            type="file"
            id="aadharCard"
            accept="image/*"
            required
            onChange={(e) => handleFileChange(e, setAadharCard)} />
        </div>
        <div>
          <label htmlFor="collegeId">College Id:</label>
          <input
            type="file"
            id="collegeId"
            accept="image/*"
            required
            onChange={(e) => handleFileChange(e, setCollegeId)} />
        </div>
        <div>
          <label htmlFor="feeReceipt">Fee Receipt:</label>
          <input
            type="file"
            id="feeReceipt"
            accept="image/*"
            required
            onChange={(e) => handleFileChange(e, setFeeReceipt)} />
        </div>
        <div>
          <label htmlFor="signature">Signature:</label>
          <input
            type="file"
            id="signature"
            accept="image/*"
            required
            onChange={(e) => handleFileChange(e, setSignature)} />
        </div>

        <div className="button-container">
          <button className="upload-button" onClick={handleSubmit}>Submit</button>
        </div>

        <div/>
      </div>
    </div>
  );
}

export default Personalinformation;
