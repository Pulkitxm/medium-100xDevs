import React, { useState } from "react";

import { apiUrl } from "../../config";
import axios from "axios";
import { SignUpInput } from "medium-common-pulkit";
import { useNavigate } from "react-router-dom";
import { hideError, showError } from "../../state/error";
import { useDispatch } from "react-redux";

const Form = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      const name = (e.target as HTMLFormElement & { name: { value: string } }).name.value;
      const email = (e.target as HTMLFormElement & { email: { value: string } }).email.value;
      const password = (e.target as HTMLFormElement & { password: { value: string } }).password.value;
      const data: SignUpInput = { name, email, password };

      if (name && email && password) {
        const res = await axios.post(`${apiUrl}/api/v1/user`, data);
        const token = res?.data?.token;

        if (token) {
          setLoading(false);
          navigate("/signin");
        }
      } else {
        setLoading(false);
        dispatch(showError("Enter all the fields to sign up"));
        setTimeout(() => {
          dispatch(hideError());
        }, 5000);
      }
      // eslint-disable-next-line no-empty
    } catch (err) {
      setLoading(false);
      dispatch(showError("Error while signing up. Please try again."));
      setTimeout(() => {
        dispatch(hideError());
      }, 5000);
    }
  };
  return (
    <form
      className="w-3/5 flex flex-col justify-center"
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="m-1 mt-5 font-bold text-lg">
        Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Enter your name"
        className="outline-none border-b-2 border-gray-400 m-1 text-lg"
      />

      <label htmlFor="email" className="m-1 mt-5 font-bold text-lg">
        Email
      </label>
      <input
        type="text"
        id="email"
        name="email"
        placeholder="Enter your email"
        className="outline-none border-b-2 border-gray-400 m-1 text-lg"
      />

      <label htmlFor="password" className="m-1 mt-5 font-bold text-lg">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        className="outline-none border-b-2 border-gray-400 m-1 text-lg"
      />

      <button
        type="submit"
        className="m-5 w-full bg-gray-900 text-white h-14 rounded  mx-auto"
      >
        {loading ? (
          <div className="m-auto w-7 h-7 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        ) : (
          "Sign Up"
        )}
      </button>
    </form>
  );
};

export default Form;
