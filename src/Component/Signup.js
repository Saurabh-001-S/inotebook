import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {

      const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
      let history = useNavigate();
      const handleSubmit = async (e) => {
            e.preventDefault();
            const { name, email, password } = credentials;
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                  method: 'POST',
                  header: {
                        "content-Type": "application/json"
                  },
                  body: JSON.stringify({ name, email, password })
            })

            const json = await response.json()
            console.log(json);
            if (json.success) {
                  localStorage.setItem('token', json.authtoken);
                  history.push("/");
                  props.showAlert("Account Created Successfully", "success");
            } else {
                  props.showAlert("Invalid Details", "danger");
            }
      }
      const onChange = (e) => {
            setCredentials({ ...credentials, [e.target.name]: e.target.value })
      }

      return (
            <div>
                  <form onSubmit={handleSubmit} >
                        <div className="mb-3">
                              <label htmlFor="name" className="form-label">Name</label>
                              <input type="text" className="form-control" id="name" name='name' onChange={onChange} />
                        </div>
                        <div className="mb-3">
                              <label htmlFor="email" className="form-label">Email address</label>
                              <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} required />
                        </div>
                        <div className="mb-3">
                              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                              <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required />
                              <div id="password" className="form-text">Contain atleast 1 Capital letter, 1 Special character and 1 Number. Atleast 8 character long</div>
                        </div>
                        <div className="mb-3">
                              <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                              <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required />
                        </div>
                        <button type="submit" className="btn btn-primary"  >Submit</button>
                  </form>
            </div>
      )
}

export default Signup
