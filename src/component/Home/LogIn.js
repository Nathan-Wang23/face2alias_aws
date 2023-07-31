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

  const Login = () => {
    return (
      <div>
        <h3 style={headerStyle}>Login to Face2Alias</h3>
        <FormField>
          <div style={inputBoxStyle}>
            <Input
              id="message"
              name="message" ///...............................
              placeholder='Alias'
              value={aliasValue}
              autoComplete="off" //to not show the prev ones
              onChange={event =>
              setAliasValue(event.detail.value)}
              
            />
          </div>
          <div style={submitButton}>
            <Button style={submitButton} type="submit" onClick={submitLogin}>Log In</Button>
          </div>
        </FormField>
      </div>
    );
  }


  export default Login;


