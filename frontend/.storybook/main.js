/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
    stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/preset-create-react-app",
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-docs",
        "@chromatic-com/storybook",
        "@storybook/addon-interactions",
    ],
    framework: {
        name: "@storybook/react-webpack5",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
    staticDirs: ["../public"],
};
export default config;
