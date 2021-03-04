import React, { useState, useRef } from 'react';
import { UnoReactDraftjs, RichTextEditorRef } from '../../../uno-react-draftjs/src/index';

const Main: React.FunctionComponent<any> = () => {
    let initialMarkdownString = localStorage.getItem('markdown');
    const [markdownString, setMarkdownSting] = useState(initialMarkdownString);
    const draftRef = useRef<RichTextEditorRef>();
    return (
        <>
            <UnoReactDraftjs markdown={markdownString} setMark={setMarkdownSting} placeholder={''} ref={draftRef} />
            <textarea value={markdownString} readOnly></textarea>
            <button
                onClick={() => {
                    draftRef.current.updateUI(initialMarkdownString);
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
        </>
    );
};

export default Main;
