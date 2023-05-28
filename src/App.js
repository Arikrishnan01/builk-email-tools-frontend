import './App.css';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import SubjectIcon from '@mui/icons-material/Subject';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6
import React, { useState } from 'react';
import axios from 'axios'
import sending from './img/sending.gif';
// import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import Header from './Pages/Header';
import Homepages from './Pages/Homepages';



function App() {

  const Form = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [company, setCompany] = useState('')
  const[loading, setLoading] = useState(false)


  const handleQuillChange = (value) => {
    setMessage(value)
  }

  const handleRequest = async (e) => {
    if(email && company && name && subject !== ""){
      if(message !== ""){
      e.preventDefault()
    setLoading(true)
    console.log({email, message, name, subject, company})

    const body = {
      email,
      message, 
      subject, 
      name,
      company
    }

   await axios.post(`https://email-tool-test.onrender.com/mail`, body, {
      headers: {
        'Content-type': 'application/json'
      }
    }).then((res) => {
      alert('Email Sent Successfully')
      setLoading(false)
      console.log(res)
      window.location.reload()
    }).catch((err) => {
      console.log(err)
      setLoading(false)
    })
      } else {
        alert('Compose Email')
      }
      
    } else {
      alert('Please fill all required filled')
    }
    
  }



    return (
      
      <form onSubmit = {handleRequest} method = "post">
        {/* <button>LOGIN</button> */}
      <div className = "form">
        <div className = "form__wrapper">
          <div className = "form__title">
          <h4>{loading ? 'Sending...' : "Send Email"}</h4>
          {
          loading && <img 
            src = {sending}
            alt = "loading..."
            style = {{
              filter: "invert(1)",
              position: "absolute",
              width : 200,
              height : 200,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            }}
          />
        }
        </div>
        <div className = "form__container">
          <div className = "form__containerItems">
            <div className = "form__containerItem">
              <div className = "form__containerItemName">
              <label>Name</label>
              <PersonIcon />
            </div>
            <div className = "form__containerItemField">
              <input
                id = "name"
                value = {name}
                onChange = {(e) => setName(e.target.value)}
                required = {true} 
                type = "text"
                placeholder = "Enter Your Name"
              />
            </div>
            </div>
            <div className = "form__containerItem">
              <div className = "form__containerItemName">
              <label>Email</label>
              <EmailIcon />
            </div>
            <div className = "form__containerItemField">
              <input 
                id = "email"
                value = {email}
                onChange = {(e) => setEmail(e.target.value)}
                required = {true}
                type = "text"
                placeholder = "Enter Your valid Email"
              />
            </div>
            </div>
            <div className = "form__containerItem">
              <div className = "form__containerItemName">
              <label>Company</label>
              <BusinessIcon />
            </div>
            <div className = "form__containerItemField">
              <input 
                id = "company"
                value = {company}
                onChange = {(e) => setCompany(e.target.value)}
                type = "text"
                placeholder = "Enter Your Company Name"
              />
            </div>
            </div>
            <div className = "form__containerItem">
              <div className = "form__containerItemName">
              <label>Subject</label>
              <SubjectIcon />
            </div>
            <div className = "form__containerItemField">
              <input
                id = "subject"
                value = {subject}
                onChange = {(e) => setSubject(e.target.value)} 
                required
                type = "text"
                placeholder = "Add Subject"
              />
            </div>
          </div>
          <div className = "form__containerItem">
            <div className = "form__containerItemName">
              <label>Compose Mail</label>
              <button
              disabled = {loading}
              onClick = {handleRequest}  type = "submit" className = "btn btn-success send">Send</button>
            </div></div>
            <div className = "container__composeMail">
            <ReactQuill
              id = "message"
              value = {message}
              onChange = {handleQuillChange}
              className = "quill" 
              placeholder = "Enter Content from here..."
            />
          </div>
          
        </div> 
      
    </div>
    
   </div>
   
 </div>
</form>
)}

  return (
    <div className="App">
      <>
      <Header/>     
      
        <Routes>
          <Route path="/" element={<Form/>}/>
          <Route path='/admin' element={<Homepages/>}/>
        </Routes>
      </>
      
    </div>
  );
}

export default App;