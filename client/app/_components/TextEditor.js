"use client"
import React, { useState } from 'react'
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

const TextEditor = ({props}) => {
    const [content, setContent] = useState('');

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
                onChange={newValue => setContent(newValue)}
                className=''
                theme='snow' />
        </div>
    )
}

export default TextEditor