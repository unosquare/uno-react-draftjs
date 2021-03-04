import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Editor, RichUtils, convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';
import { IButtonStyles, IconButton, Stack } from '@fluentui/react';
import { RichTextEditorProps } from '../interfaces';
import { useEffectWithDebounce } from 'uno-react';

const buttonStyles: IButtonStyles = {
    icon: { color: 'grey' },
    root: {
        selectors: {
            ':hover .ms-Button-icon': {
                color: 'grey',
            },
            ':active .ms-Button-icon': {
                color: 'grey',
            },
        },
    },
};
const toMarkdownOptions = {
    styleItems: {
        UNDERLINE: {
            open: () => '++',
            close: () => '++',
        },
    },
    preserveNewlines: true,
};
const fromMarkdownOptions = {
    blockStyles: {
        ins_open: ['UNDERLINE'],
    },
    remarkableOptions: {
        enable: {
            inline: ['ins'],
        },
    },
    preserveNewlines: true,
};
const _convertFromMark = (markdown: string) => {
    const raw = markdownToDraft(markdown, fromMarkdownOptions);
    const content = convertFromRaw(raw);
    return EditorState.createWithContent(content);
};
const _convertToMark = (editor: EditorState) => {
    const content = editor.getCurrentContent();
    const raw = convertToRaw(content);
    const mark = draftToMarkdown(raw, toMarkdownOptions);
    return mark;
};

export type RichTextEditorRef = {
    updateUI: (newMarkdown: string) => void;
};

export const UnoReactDraftjs = forwardRef<RichTextEditorRef, RichTextEditorProps>(
    ({ markdown, setMark, placeholder }: RichTextEditorProps, ref) => {
        const [editorState, setEditor] = useState(_convertFromMark(markdown));
        const [hidden, setHidden] = React.useState(true);
        const [selected, setSelected] = React.useState({
            bold: false,
            italic: false,
            underline: false,
        });
        const applyInlineStyle = (event: any, style: string) => {
            event.preventDefault();
            handleChange(RichUtils.toggleInlineStyle(editorState, style));
            setSelected({
                ...selected,
                [style.toLowerCase()]: !selected[style.toLowerCase()],
            });
        };

        const applyBlockType = (event: any, style: string) => {
            event.preventDefault();
            handleChange(RichUtils.toggleBlockType(editorState, style));
        };

        const handleChange = (newState: EditorState) => {
            setEditor(newState);
        };

        const updateUI = (newmark: string) => {
            setEditor(_convertFromMark(newmark));
            setMark(newmark);
        };
        const updateMarkdownEffect = React.useCallback(() => {
            setMark(_convertToMark(editorState));
        }, [editorState]);
        useEffectWithDebounce(updateMarkdownEffect, 200);
        useImperativeHandle(ref, () => ({
            updateUI: updateUI,
        }));
        return (
            <div style={{ border: '1px solid lightgray', minHeight: '80px' }}>
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
                    onBlur={() => setHidden(true)}
                    onFocus={() => setHidden(false)}
                    editorState={editorState}
                    onChange={handleChange}
                    placeholder={placeholder}
                />
            </div>
        );
    },
);
