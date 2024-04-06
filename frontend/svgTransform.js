module.exports = {
    process() {
        return {
            code: `module.exports = { ReactComponent: 'svg' };`,
        };
    },
    getCacheKey() {
        return "svgTransform";
    },
};
