import { Editor } from '@tinymce/tinymce-react';
import React from 'react';
import PropTypes from 'prop-types';

function TinyMcEditor({ description, handleEditorChange }) {
  return (
    <Editor
      value={description}
      onEditorChange={handleEditorChange}
      init={{
        height: 235,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
          'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: `
        body {
          color: #585858;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
        }
      `
      }}
    />
  );
}

TinyMcEditor.propTypes = {
  description: PropTypes.string,
  handleEditorChange: PropTypes.func
};

export default TinyMcEditor;
