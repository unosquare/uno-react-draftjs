import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';
import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import { toMarkdownOptions, fromMarkdownOptions } from './options';

export const _convertFromMark = (markdown: string): EditorState => {
    const raw = markdownToDraft(markdown, fromMarkdownOptions);
    const content = convertFromRaw(raw);
    return EditorState.createWithContent(content);
};
export const _convertToMark = (editor: EditorState): string => {
    const content = editor.getCurrentContent();
    const raw = convertToRaw(content);
    const mark = draftToMarkdown(raw, toMarkdownOptions);
    return mark;
};
