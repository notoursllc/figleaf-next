module.exports = {
    stories: [
        "../src/**/*.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    addons: [
        // "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        {
            name: "@storybook/addon-postcss",
            options: {
                postcssLoaderOptions: {
                    implementation: require("postcss"),
                },
            },
        }
    ],
    framework: {
        // name: "@storybook/vue3-vite",
        name: "@storybook/vue3",
        options: {},
    },

    core: {
        builder: "@storybook/builder-vite",
    },

    features: {
        storyStoreV7: true,
    },

    docs: {
        autodocs: "tag",
    },
};
