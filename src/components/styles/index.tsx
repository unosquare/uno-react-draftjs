import { IButtonStyles } from '@fluentui/react';
import { CSSProperties } from 'react';

export const buttonStyles: IButtonStyles = {
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

export const containerBaseStyles: CSSProperties = {
    border: '1px solid lightgray',
    minHeight: '80px',
    cursor: 'text',
    padding: '5px'
};