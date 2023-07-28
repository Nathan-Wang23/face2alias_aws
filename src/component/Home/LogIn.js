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
        <div>
              {/* TopNavigationComponent */}
              <TopNavigation
              identity={{
                href: "#",
                title: "Face2Alias",
              }}
              utilities={[
                {
                  type: "menu-dropdown",
                  iconName: "settings",
                  ariaLabel: "Settings",
                  title: "Settings",
                  items: [
                    {
                      id: "settings-org",
                      text: "Organizational settings"
                    },
                    {
                      id: "settings-project",
                      text: "Project settings"
                    }
                  ]
                },
                {
                  type: "menu-dropdown",
                  text: "#Alias",
                  description: "email@example.com",
                  iconName: "user-profile",
                  items: [
                    { id: "profile", text: "Profile" },
                    { id: "preferences", text: "Preferences" },
                    { id: "security", text: "Security" },
                    {
                      id: "support-group",
                      text: "Support",
                      items: [
                        {
                          id: "documentation",
                          text: "Documentation",
                          href: "#",
                          external: true,
                          externalIconAriaLabel:
                            " (opens in new tab)"
                        },
                        { id: "support", text: "Support" },
                        {
                          id: "feedback",
                          text: "Feedback",
                          href: "#",
                          external: true,
                          externalIconAriaLabel:
                            " (opens in new tab)"
                        }
                      ]
                    },
                    { id: "signout", text: "Sign out" }
                  ]
                }
              ]}
              />

         {/* <div className="login-wrapper"> */}
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
        </div>    
    )
  }


  export default Login; 
