import { IButtonStyles } from '@fluentui/react';

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
