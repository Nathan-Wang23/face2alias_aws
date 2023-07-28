import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FormField from '@cloudscape-design/components/form-field';
import FileUpload from '@cloudscape-design/components/file-upload';
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

const SubmitButton = () => (
  <Link to="/components/Home/LogIn">
    <Button variant="primary">Submit</Button>
  </Link>
);
const SignUp = () => {
  const [value, setValue] = React.useState([]);
  return (
    <div>
      <h1>Sign Up Page</h1>
      {/* upload photo */}

      <div style={containerStyle}>
                <div style={uploadBoxStyle}>
                  <FormField
                    label="Form field label"
                    description="Description"
                  >
                    <FileUpload
                      onChange={({ detail }) => setValue(detail.value)}
                      value={value}
                      i18nStrings={{
                        uploadButtonText: e =>
                          e ? "Choose files" : "Choose file",
                        dropzoneText: e =>
                          e
                            ? "Drop files to upload"
                            : "Drop file to upload",
                        removeFileAriaLabel: e =>
                          `Remove file ${e + 1}`,
                        limitShowFewer: "Show fewer files",
                        limitShowMore: "Show more files",
                        errorIconAriaLabel: "Error"
                      }}
                      showFileLastModified
                      showFileSize
                      showFileThumbnail
                      tokenLimit={3}
                      constraintText="Upload photo"
                    />
                  </FormField>
                  <SubmitButton />

                </div>
              </div>
    </div>
  );
};

export default SignUp;