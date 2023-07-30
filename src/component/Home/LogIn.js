import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FormField from '@cloudscape-design/components/form-field';
import FileUpload from '@cloudscape-design/components/file-upload';
import TopNavigation from "@cloudscape-design/components/top-navigation";
import Button from "@cloudscape-design/components/button";
import 'bootstrap/dist/css/bootstrap.min.css';

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const uploadBoxStyle = {
    width: '300px',
    height: '200px',
    border: '2px dashed #ddd',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  };

  function Login() {
    return(
            <form>
                <label>
                <p>Alias</p>
                <input type="text" />
                </label>
                <label>
                <p>Password</p>
                <input type="password" />
                </label>
                <div>
                <button type="submit">Submit</button>
                </div>
            </form>
    )
  }


  export default Login;


