export const toMarkdownOptions = {
    styleItems: {
        UNDERLINE: {
            open: (): string => '++',
            close: (): string => '++',
        },
    },
    preserveNewlines: true,
};
export const fromMarkdownOptions = {
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
