import React from 'react';
import {useDropzone} from 'react-dropzone';
import axios from "axios";

function Dropzone(props) {
  const {getRootProps, getInputProps, open, acceptedFiles} = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true
  });

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  function handleClick() {
    acceptedFiles.map(file => {
        let formData = new FormData();
        formData.append('name', file.name);
        formData.append('username', localStorage.getItem('username'));
        if (['image/jpeg', 'image/png'].indexOf(file.type) !== -1 ) {
          formData.append("template", file);
        } else
        {
          formData.append("material", file);
        }
        axios.post('http://localhost:8000/camera/template/', formData, {
          headers: {
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
          },
        })
          .then(response => {
              if (response.data) {
                console.log(response.data);
              }
            }
          )
          .catch(error => console.log(error))
      });
  }


  return (
    <>
        <div {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here</p>
          <button type="button" onClick={open}>
            Open File Dialog
          </button>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
        <button onClick={handleClick}>upload</button>
    </>
  );
}

export default Dropzone;