// import React from 'react'
// import { Link } from 'react-router-dom'
// import { useState } from 'react'
// import Signupvalidation from './Signupvalidation'
// import { useNavigate } from 'react-router-dom'

// import axios from 'axios'
// function Signup() {
//     const navigate=useNavigate();
//     const [values,setValues]=useState({
//         email:'',
//         password:'',
//         name:''
//     })
//     const [errors,setErrors]=useState({})
//     const handleSubmit=(event)=>{
//         event.preventDefault();
//         //values.email.toLowerCase();
//          setErrors(Signupvalidation(values))
//         if(errors.name===""&&errors.password==="" && errors.email===""){
//             axios.post("http://localhost:8081/signup",values)
//             .then(res=>{
//                 console.log(res);
//                 navigate("/login")
//             })
//             .catch(err=> console.log(err));
//         }
//     }
    // const handleinput=(event)=>{
    //     setValues(prev=>({...prev,[event.target.name]:[event.target.value]}))
    // }
//   return (
    // <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
    //     <div className='bg-white p-3 rounded w-30'>
    //         <h2>Sign Up</h2>
    //     <form action="" onSubmit={handleSubmit}>
    //     <div className='mb-3'>
    //             <label htmlFor='name'><strong>Name</strong></label>
    //             <input type='name' placeholder='Enter Name' className='form-control rounded-0' name='name' onChange={handleinput}></input>
    //             {errors.name && <span className="text-danger">{errors.name}</span>}
    //         </div>
    //         <div className='mb-3'>
    //             <label htmlFor='email'><strong>Email</strong></label>
    //             <input type='email' placeholder='Enter Email' className='form-control rounded-0' name='email' onChange={handleinput}></input>
    //             {errors.email && <span className="text-danger">{errors.email}</span>}
    //         </div>
    //         <div className='mb-3'>
    //             <label htmlFor='password'><strong>Password</strong></label>
    //             <input type='password' placeholder='Enter Password' className='form-control rounded-0' name='password' onChange={handleinput}></input>
    //             {errors.password && <span className="text-danger">{errors.password}</span>}
    //         </div>
    //         <button type="submit" className='btn btn-success w-100 rounded-0'><strong>SIGN UP</strong></button>
    //         <p>Agreeing to terms and conditions</p>
    //         <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>LOG IN</Link>
    //     </form>
    //     </div>
    // </div>
//   )
// }

// export default Signup
import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Signupvalidation from './Signupvalidation';


function Signup() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: '',
        name: ''
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false); // New state variable

    const handleSubmit = (event) => {
        //Don't enter password having symbols
        event.preventDefault();
        setErrors(Signupvalidation(values));
        setSubmitted(true); // Set submitted to true when the form is submitted
    };

    const handleinput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }));
    };

    useEffect(() => {
        // Check if there are no errors and the form has been submitted
        if (submitted && !errors.name && !errors.email && !errors.password) {
            axios.post("http://localhost:8081/signup", values)
                .then(res => {
                    console.log("manoj1")
                    console.log(res);
                    console.log("manoj2")
                    navigate("/login");
                })
                .catch(err => console.log(err));
        }
    }, [submitted, errors]);

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-30'>
            <h2>Sign Up</h2>
        <form action="" onSubmit={handleSubmit}>
        <div className='mb-3'>
                <label htmlFor='name'><strong>Name</strong></label>
                <input type='name' placeholder='Enter Name' className='form-control rounded-0' name='name' onChange={handleinput}></input>
                {errors.name && <span className="text-danger">{errors.name}</span>}
            </div>
            <div className='mb-3'>
                <label htmlFor='email'><strong>Email</strong></label>
                <input type='email' placeholder='Enter Email' className='form-control rounded-0' name='email' onChange={handleinput}></input>
                {errors.email && <span className="text-danger">{errors.email}</span>}
            </div>
            <div className='mb-3'>
                <label htmlFor='password'><strong>Password</strong></label>
                <input type='password' placeholder='Enter Password' className='form-control rounded-0' name='password' onChange={handleinput}></input>
                {errors.password && <span className="text-danger">{errors.password}</span>}
            </div>
            <button type="submit" className='btn btn-success w-100 rounded-0'><strong>SIGN UP</strong></button>
            <p>Agreeing to terms and conditions</p>
            <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>LOG IN</Link>
        </form>
        </div>
    </div>
    );
}

export default Signup;
