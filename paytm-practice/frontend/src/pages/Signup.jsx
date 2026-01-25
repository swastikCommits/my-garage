import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200 w-full max-w-[400px] border border-slate-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Create an account</h1>
        </div>

        {/* Form Fields */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Username</label>
            <input 
              type="text" 
              placeholder="Enter your name"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm text-slate-800"
              onChange = {(e) => setUsername(e.target.value)}
              value = {username}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm text-slate-800"
              onChange = {(e) => setPassword(e.target.value)}
              value = {password}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">First Name</label>
            <input 
              type="text" 
              placeholder="Enter your first name"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm text-slate-800"
              onChange = {(e) => setFirstName(e.target.value)}
              value = {firstName}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Last Name</label>
            <input 
              type="text" 
              placeholder="Enter your last name"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm text-slate-800"
                onChange = {(e) => setLastName(e.target.value)}
              value = {lastName}
            />
          </div>

          <button className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-100 transition-all shadow-md shadow-indigo-100 mt-2 cursor-pointer"
          onClick = {async () => {
            try {
             const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                username,
                password,
                lastName,
                firstName
            })
            localStorage.setItem("token", response.data.token);
            setErrorMessage(""); // Clear any previous errors on success
            navigate('/dashboard');
            } catch (e) {
                if (e.response && e.response.status === 411) {
                    setErrorMessage(e.response.data.message);
                } else {
                    setErrorMessage("An unexpected error occurred.");
                }
            } finally {
                // Clear input fields in both success and error cases
                setUsername("");
                setPassword("");
                setFirstName("");
                setLastName("");
            }
          }}
          >
            Create account
          </button>
          {errorMessage && <div className="text-red-500 text-center mt-4">{errorMessage}</div>}
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Already have an account? {' '}
          <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 underline-offset-4 hover:underline" onClick={ () => navigate('/signin')}>Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;