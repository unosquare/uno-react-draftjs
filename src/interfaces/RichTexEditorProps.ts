import { CSSProperties } from 'react';

export interface RichTextEditorProps {
    markdown: string;
    setMark: any;
    placeholder: string;
    ref?: any;
    readonly?: boolean;
    styles?: Partial<CSSProperties>;
}
