import React from 'react';
import FormField from '@cloudscape-design/components/form-field';
import FileUpload from '@cloudscape-design/components/file-upload';
import TopNavigation from "@cloudscape-design/components/top-navigation";
import Button from "@cloudscape-design/components/button";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import ImageBox from "./ImageBox"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Modal from "react-modal";
// @cloudscape-design/components/modal
import Input from "@cloudscape-design/components/input";
import "@fontsource/open-sans"; // Defaults to weight 400
import "@fontsource/open-sans/400.css"; // Specify weight
import ErrorBar from './errorBar';
import SuccessBar from './successBar';


<link rel="stylesheet" href="styles.css"></link>
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
}

const alertStyle = {
  zIndex: '999999'
}

const headerStyle = {
  fontFamily:'Open Sans',
  fontSize:'18px',
  fontWeight: '700',
  paddingLeft:'35%',
  padding: '30px 0',
  textAlign: 'center'
}

const modalStyle = {
  overlay: {
    backgroundColor:'rgba(25,37,52,0.75)',
  },
  content: {
    borderRadius:'20px',
    width:'30%',
    height:'40%',
    position: 'absolute',
    left: '35%',
    top: '30%'
  }
}

const submitButton = {
  width:'100%',
  textAlign:'center',
  paddingLeft: '0%',
  paddingTop:'15%',
  paddingBottom: '0%'

}

const navBar = {
  position: 'sticky'
}

const uploadBoxStyle = {
  width: '400px',
  height: '200px',
  border: '2px dashed #ddd',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  margin: 'auto',
  padding: 'auto',
  textAlign: 'center'
}
const inputBoxStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//   },
// };



function Home() {
  const [value, setValue] = React.useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [previousUploads, setPreviousUploads] =React.useState([]);
  const [boxesOfBoxes, setBB] = React.useState([]);
  const [widths, setWidths] = React.useState([]);
  const [heights, setHeights] = React.useState([]);
  const [colorsAll, setColorsAll] = React.useState([]);
  const [aliasesAll, setAliasesAll] = React.useState([]);
  const [latest, setLatest] = React.useState(-1);
  const [isModalOpen, setIsModalOpen] = React.useState(true);
  const [aliasValue, setAliasValue] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [user, setUser] = React.useState('');



  async function submitLogin() {
    try {
      let alias = aliasValue.toString();
      let url = "https://jbk08mzwr9.execute-api.us-west-2.amazonaws.com/v1/" // the API 
      let res = await fetch(url, {
        method: 'POST', // at first we were using ANY in the api, therefore it would give us Missing Authentication Token error, and it took us a while to understand this was the error 
        body: alias
      });
      if (res.status === 200) {
        setSuccess(true);
        setUser(aliasValue);
        setTimeout(() => {
          setSuccess(false);
          setIsModalOpen(false);
        }, 2000);
        
      } else {
        console.log(res);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 5000);
      }
      setAliasValue("");
    } catch (error) {
      console.log("error");
    }
  };


  function face2aliasSubmit() {
    if (value === null || value.length === 0) {
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

        if (w === undefined || h === undefined) {
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

        let ratio = 400 / hei;
        hei *= ratio;
        wid *= ratio;

        let boxes = [];
        let aliases_list = data['aliases'];
        let boxes_list = data['boxes'];

        if (aliases_list === undefined) {
          return;
        }

        let num_detected = aliases_list.length;
        let cols = [];
        console.log(aliases_list)

        for (let i = 0; i < num_detected; i++) {
          if (aliases_list[i] === "") {
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
        let temp1 = boxesOfBoxes;
        temp1.push(boxes);
        setBB(temp1);
        let temp2 = widths;
        temp2.push(wid);
        setWidths(temp2);
        let temp3 = heights;
        temp3.push(hei);
        setHeights(temp3);
        let temp4 = colorsAll;
        temp4.push(cols);
        setColorsAll(temp4);
        let temp5 = aliasesAll;
        temp5.push(aliases_list);
        setAliasesAll(temp5);
        let temp6 = previousUploads;
        temp6.push(image);
        setPreviousUploads(temp6);
        let last = latest;
        last += 1;
        setLatest(last);
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
              <div>
                <Modal 
                  style={modalStyle}
                  isOpen={isModalOpen}>

                    {alert && (
                      <div style={alertStyle}>
                        <ErrorBar/>
                      </div> 
                    )}

                    {success && (
                      <div style={alertStyle}>
                        <SuccessBar/>
                    </div>
                    )}

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
                  </Modal>
              </div>
              <div style={navBar}>
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
                  text: user, 
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
              </div>

              {/* FileUpload */}
              <div  style={containerStyle}>
                <div className="center" >
                {previousUploads.length > 0 && (
                      <Carousel className='crls' showThumbs={false} emulateTouch selectedItem={latest} autoFocus>
                        {previousUploads.map((upload, index) => (
                          <div key={index}>
                            <ImageBox image_base64={upload} boxesCoordinates={boxesOfBoxes[index]} width={widths[index]} height={heights[index]} color={colorsAll[index]} aliases={aliasesAll[index]}/>
                          </div>
                        ))}
                    </Carousel>)}

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
