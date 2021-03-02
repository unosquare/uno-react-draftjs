import React, { useState, useRef } from 'react';
import { UnoReactDraftjs } from '../../../uno-react-draftjs/src/index';

const Main: React.FunctionComponent<any> = () => {
    const original = 'hola **_mundo sdasd_**';
    const [markdown, setMark] = useState(original);
    const draftRef = useRef();
    return (
        <>
            <UnoReactDraftjs markdown={markdown} setMark={setMark} placeholder={''} ref={draftRef} />
            <p>{markdown}</p>
            <button
                onClick={() => {
                    draftRef.current.setEditorValue(original);
                }}
            >
                Reset
            </button>
        </>
    );
};

export default Main;
