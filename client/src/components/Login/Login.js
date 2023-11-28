// import React from 'react'
// import { useState } from 'react'
// import "bootstrap/dist/css/bootstrap.min.css"
// import { Link, useNavigate } from 'react-router-dom'
// import Loginvalidation from "./Loginvalidation"
// import axios from 'axios';
// import { Navigate } from 'react-router-dom'
// import { useContext } from 'react'
// import { Context } from '../../utils/context'
// function Login() {
//     const [values,setValues]=useState({
//         email:'',
//         password:''
//     })
//     const{user,setUser}=useContext(Context)
//     const [errors,setErrors]=useState({})
//     const navigate=useNavigate();
//     const handleSubmit=(event)=>{
//         event.preventDefault();
//         //values.email.toLowerCase();
//          setErrors(Loginvalidation(values));
//          if(errors.password==="" && errors.email===""){
//             axios.post("http://localhost:8081/login",values)
//             .then(res=>{
//                 //console.log(res);
//                 if(res.data==="success"){
//                     setUser(values.email);
//                     console.log(user);
//                     navigate("/")
//                 }
                
//             else{
//                 alert("no account exist")
//             }
//             })
//             .catch(err=> console.log(err));
//         }
//     }
//     const handleinput=(event)=>{
//         setValues(prev=>({...prev,[event.target.name]:[event.target.value]}))
//     }
//   return (
//     <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
//         <div className='bg-white p-3 rounded w-30'>
//         <h2>Log In</h2>
//         <form action="" onSubmit={handleSubmit}>
//             <div className='mb-3'>
//                 <label htmlFor='email'><strong>Email</strong></label>
//                 <input type='email' placeholder='Enter Email' className='form-control rounded-0' onChange={handleinput} name="email"></input>
//                 {errors.email && <span className="text-danger">{errors.email}</span>}
//             </div>
//             <div className='mb-3'>
//                 <label htmlFor='password'><strong>Password</strong></label>
//                 <input type='password' placeholder='Enter Password' className='form-control rounded-0' onChange={handleinput} name="password"></input>
//                 {errors.password && <span className="text-danger">{errors.password}</span>}
//             </div>
//             <button type="submit" className='btn btn-success w-100 rounded-0'><strong>LOG IN</strong></button>
//             <p>Agreeing to terms and conditions</p>
//             <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>CREATE ACCOUNT</Link>
//         </form>
//         </div>
//     </div>
//   )
// }

//export default Login


// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';
// import "bootstrap/dist/css/bootstrap.min.css"
// import { Context } from '../../utils/context'; // Import your context
// import Loginvalidation from "./Loginvalidation";


// function Login() {
//     const navigate = useNavigate();
//     const { setUser } = useContext(Context); // Use your context here

//     const [values, setValues] = useState({
//         email: '',
//         password: ''
//     });

//     const [errors, setErrors] = useState({});

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setValues({ ...values, [name]: value });
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         setErrors(Loginvalidation(values));
//     };

//     useEffect(() => {
//         // Check if there are no errors
//         if (!errors.email && !errors.password) {
//             axios.post("http://localhost:8081/login", values)
//                 .then(res => {
//                     if (res.data === "success") {
//                         setUser(values.email);
//                         navigate("/");
//                     } else {
//                         alert("No account exists");
//                     }
//                 })
//                 .catch(err => console.log(err));
//         }
//     }, [errors, setUser]); // This effect runs whenever 'errors' state changes

//     const handleinput=(event)=>{
//                  setValues(prev=>({...prev,[event.target.name]:[event.target.value]}))
//              }
//     return (
//         <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
//          <div className='bg-white p-3 rounded w-30'>
//          <h2>Log In</h2>
//          <form action="" onSubmit={handleSubmit}>
//              <div className='mb-3'>
//                  <label htmlFor='email'><strong>Email</strong></label>
//                  <input type='email' placeholder='Enter Email' className='form-control rounded-0' onChange={handleinput} name="email"></input>
//                  {errors.email && <span className="text-danger">{errors.email}</span>}
//              </div>
//              <div className='mb-3'>
//                  <label htmlFor='password'><strong>Password</strong></label>
//                  <input type='password' placeholder='Enter Password' className='form-control rounded-0' onChange={handleinput} name="password"></input>
//                  {errors.password && <span className="text-danger">{errors.password}</span>}
//              </div>
//              <button type="submit" className='btn btn-success w-100 rounded-0'><strong>LOG IN</strong></button>
//              <p>Agreeing to terms and conditions</p>
//              <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>CREATE ACCOUNT</Link>
//          </form>
//          </div>
// //     </div>
//     );
// }

// export default Login;


import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Context } from '../../utils/context'; // Import your context
import Loginvalidation from "./Loginvalidation";
import "bootstrap/dist/css/bootstrap.min.css"

function Login() {
    const navigate = useNavigate();
    const { setUser } = useContext(Context); // Use your context here

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false); // New state variable

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };
        const handleinput=(event)=>{
                 setValues(prev=>({...prev,[event.target.name]:[event.target.value]}))
             }
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Loginvalidation(values));
        setSubmitted(true); // Set submitted to true when the form is submitted
    };

    useEffect(() => {
        // Check if there are no errors and the form has been submitted
        if (submitted && !errors.email && !errors.password) {
            axios.post("http://localhost:8081/login", values)
                .then(res => {
                    if (res.data === "success") {
                        setUser(values.email);
                        navigate("/");
                    } else {
                        alert("No account exists");
                    }
                })
                .catch(err => console.log(err));
        }
    }, [submitted, errors, setUser]); // This effect runs when submitted or errors change

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
         <div className='bg-white p-3 rounded w-30'>
         <h2>Log In</h2>
         <form action="" onSubmit={handleSubmit}>
             <div className='mb-3'>
                 <label htmlFor='email'><strong>Email</strong></label>
                 <input type='email' placeholder='Enter Email' className='form-control rounded-0' onChange={handleinput} name="email"></input>
                 {errors.email && <span className="text-danger">{errors.email}</span>}
             </div>
             <div className='mb-3'>
                 <label htmlFor='password'><strong>Password</strong></label>
                 <input type='password' placeholder='Enter Password' className='form-control rounded-0' onChange={handleinput} name="password"></input>
                 {errors.password && <span className="text-danger">{errors.password}</span>}
             </div>
             <button type="submit" className='btn btn-success w-100 rounded-0'><strong>LOG IN</strong></button>
             <p>Agreeing to terms and conditions</p>
             <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>CREATE ACCOUNT</Link>
         </form>
         </div>
     </div>
    );
}

export default Login;
