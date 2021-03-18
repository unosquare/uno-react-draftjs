import React, { useState, useRef } from 'react';
import { UnoReactDraftjs, RichTextEditorRef } from '../../src/index';

const Main: React.FunctionComponent<any> = () => {
    let initialMarkdownString = localStorage.getItem('markdown');
    const [markdownString, setMarkdownSting] = useState(initialMarkdownString);
    const draftRef = useRef<RichTextEditorRef>();
    return (
        <div style={{ margin: '10px' }}>
            <UnoReactDraftjs markdown={markdownString} setMark={setMarkdownSting} placeholder={''} ref={draftRef} />
            <textarea value={markdownString} readOnly></textarea>
            <button
                onClick={() => {
                    draftRef.current.setText(initialMarkdownString);
                }}
            >
                Reset
            </button>
            <button
                onClick={() => {
                    localStorage.setItem('markdown', markdownString);
                    initialMarkdownString = markdownString;
                }}
            >
                Save
            </button>
        </div>
    );
};

export default Main;
