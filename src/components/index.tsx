import React, { useState, useImperativeHandle, forwardRef, useRef } from 'react';
import { Editor, RichUtils } from 'draft-js';
import { _convertFromMark, _convertToMark } from '../utils';
import { IconButton, Stack } from '@fluentui/react';
import { RichTextEditorProps } from '../interfaces';
import { useEffectWithDebounce } from 'uno-react';
import { buttonStyles } from './styles';

export type RichTextEditorRef = {
    setText: (newMarkdown: string) => void;
};

export const UnoReactDraftjs = forwardRef<RichTextEditorRef, RichTextEditorProps>(
    ({ markdown, setMark, placeholder, readonly }: RichTextEditorProps, ref) => {
        const [editorState, setEditor] = useState(_convertFromMark(markdown));
        const [hidden, setHidden] = React.useState(true);
        const editor = useRef<Editor>(null);
        const [selected, setSelected] = React.useState({
            bold: false,
            italic: false,
            underline: false,
        });
        const focus = () => {
            editor.current?.focus();
        };
        const applyInlineStyle = (event: any, style: string) => {
            event.preventDefault();
            setEditor(RichUtils.toggleInlineStyle(editorState, style));
            setSelected({
                ...selected,
                [style.toLowerCase()]: !selected[style.toLowerCase()],
            });
        };

        const applyBlockType = (event: any, style: string) => {
            event.preventDefault();
            setEditor(RichUtils.toggleBlockType(editorState, style));
        };

        const setText = (newmark: string) => {
            setEditor(_convertFromMark(newmark));
            setMark(newmark);
        };
        const updateMarkdownEffect = React.useCallback(() => {
            setMark(_convertToMark(editorState));
        }, [editorState]);
        useEffectWithDebounce(updateMarkdownEffect, 200);
        useImperativeHandle(ref, () => ({
            setText: setText,
        }));
        return (
            <div onClick={focus} style={{ border: '1px solid lightgray', minHeight: '80px', cursor: 'text' }}>
                {!hidden && (
                    <Stack
                        tokens={{ childrenGap: 8 }}
                        styles={{ root: { borderBottom: '1px solid lightgrey', marginBottom: '10px' } }}
                        horizontal
                    >
                        <IconButton
                            iconProps={{ iconName: 'Bold' }}
                            title='Bold'
                            ariaLabel='Bold'
                            styles={buttonStyles}
                            onMouseDown={(e) => applyInlineStyle(e, 'BOLD')}
                            checked={selected.bold}
                        />
                        <IconButton
                            iconProps={{ iconName: 'Italic' }}
                            title='Italic'
                            ariaLabel='Italic'
                            styles={buttonStyles}
                            onMouseDown={(e) => applyInlineStyle(e, 'ITALIC')}
                            checked={selected.italic}
                        />
                        <IconButton
                            iconProps={{ iconName: 'Underline' }}
                            title='Underline'
                            ariaLabel='Underline'
                            styles={buttonStyles}
                            onMouseDown={(e) => applyInlineStyle(e, 'UNDERLINE')}
                            checked={selected.underline}
                        />
                        <IconButton
                            iconProps={{ iconName: 'BulletedList' }}
                            title='BulletedList'
                            ariaLabel='BulletedList'
                            styles={buttonStyles}
                            onMouseDown={(e) => applyBlockType(e, 'unordered-list-item')}
                        />
                    </Stack>
                )}
                <Editor
                    ref={editor}
                    onBlur={() => setHidden(true)}
                    onFocus={() => setHidden(false)}
                    editorState={editorState}
                    onChange={setEditor}
                    placeholder={placeholder}
                    readOnly={readonly}
                />
            </div>
        );
    },
);
