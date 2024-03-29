"use client"
import React, { useState } from 'react'
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

const TextEditor = ({onChange}) => {
    const [content, setContent] = useState('');
    // Handle content change and pass it to the parent component
    const handleContentChange = (newValue) => {
        setContent(newValue);
        onChange(newValue); // Pass content to parent component
    };

    const modules = {
        toolbar: [
            [{ 'headers': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'bullet' }, { 'list': 'ordered' }],
            ['link', 'image'],
            ['clean']

        ]
    };
    const formats = [
        'headers',
        'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'link', 'image'
    ]

    return (
        <div>
            <ReactQuill
                value={content}
                modules={modules} formats={formats}
                onChange={handleContentChange}
                className=''
                theme='snow' />
        </div>
    )
}

export default TextEditor