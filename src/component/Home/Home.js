import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FormField from '@cloudscape-design/components/form-field';
import FileUpload from '@cloudscape-design/components/file-upload';
import TopNavigation from "@cloudscape-design/components/top-navigation";
import Button from "@cloudscape-design/components/button";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import ImageBox from "./ImageBox"

<link rel="stylesheet" href="styles.css"></link>
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
}

const uploadBoxStyle = {
  width: '400px',
  height: '300px',
  border: '2px dashed #ddd',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  margin: 'auto',
  padding: '5%',
  textAlign: 'center'
};

function Home() { 
  const [value, setValue] = React.useState([]);
  const [imgs,setImgs] = React.useState()
  const[imag, setImag] = React.useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [boxes, setBoxes] = React.useState([]);
  const [widthImg, setWidthImg] = React.useState();
  const [heightImg, setHeightImg] = React.useState();
  const [colors, setColors] = React.useState([]);
  const [aliasesImg, setAliasesImg] = React.useState([]);


  function face2aliasSubmit() {
    if (value == null || value.length == 0) {
      console.log("Error: no file specified")
    }
    else {
      let file = new File(value, "image.jpeg");
      console.log(file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      setIsButtonDisabled(true);
      reader.onload = async function() {
        try {
          let image_base64 = reader.result;
          let body = image_base64.substring(37);
          console.log(image_base64)
          let url = "https://oi10c481f0.execute-api.us-west-2.amazonaws.com/v1/"
          let res = await fetch(url, {
            method: 'POST',
            body: body
          });
          const data = await res.json();          
          bound_boxes(image_base64, data);
          setImag(image_base64);
          setIsButtonDisabled(false);
          setValue([]);
        } catch (error) {
          console.log("error");
        }
        
      }

    }
    
  }



  function bound_boxes(image, data) {
    let getDimensions = new Promise(function(resolve, reject) {
      let img = new Image();
      img.onload = () => {
        let w = img.width;
        let h = img.height;
        
        if (w == undefined || h == undefined) {
          reject("ERROR");  // when error
        } else {
          resolve([w, h]); // when successful
        }
      }
      img.src = image;
    });
    
    getDimensions.then(
      function(da) { 
        let wid = da[0];
        let hei = da[1];

        if (hei / window.screen.height > 0.7) {
          hei *= 0.5;
          wid *= 0.5;
        }

        let boxes = new Array();        
        let aliases_list = data['aliases'];
        let boxes_list = data['boxes'];
        let num_detected = aliases_list.length;
        let cols = new Array();
        console.log(aliases_list)

        for (let i = 0; i < num_detected; i++) {
          if (aliases_list[i] == "") {
            cols.push("#FF0000");
            aliases_list[i] = "na";
          } else {
            cols.push("#39FF14");
            let temp = aliases_list[i];
            aliases_list[i] = " " + temp + " ";
          }
          // how to get the name 
          boxes.push({x: boxes_list[i]['Left'] * wid, y: boxes_list[i]['Top'] * hei, width: boxes_list[i]['Width'] * wid, height: boxes_list[i]['Height'] * hei})
        }
        console.log(boxes);
        setBoxes(boxes);
        setHeightImg(hei);
        setWidthImg(wid);
        setColors(cols);
        setAliasesImg(aliases_list);
      },
      function(error) {
        console.log(error);
      }
    );
  }
  
  const SubmitButton = () => (
    <Button className="submitButton" onClick={face2aliasSubmit} variant="primary" disabled={isButtonDisabled} >Submit</Button>
  );
  
    return ( 
            <div> 
              {/* TopNavigation */}
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

              {/* FileUpload */}
              <div  style={containerStyle}>
                <div className="center" >
                <div className="div1">
                  <ImageBox image_base64={imag} boxesCoordinates={boxes} width={widthImg} height={heightImg} color={colors} aliases={aliasesImg}/>
                </div>
                <div className="div2" style={uploadBoxStyle}>
                  <FormField
                  label="Upload your image"
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
                      tokenLimit={1}
                    />
                  </FormField> 
                  <SubmitButton />
                  
                </div>
                </div>
              </div>
            </div>
     
    );
}

export default Home; 