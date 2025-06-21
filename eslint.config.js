import eslintPluginAstro from "eslint-plugin-astro";
export default [
    // add more generic rule sets here, such as:
    // js.configs.recommended,
    ...eslintPluginAstro.configs.recommended,
    {
        rules: {
            // enforce consistent use of semicolons
            "semi": ["error", "always"],
            // enforce consistent quotes
            "quotes": ["error", "double"],
            // disallow unused variables
            "no-unused-vars": "error",
            // enforce consistent comma style
            "comma-dangle": ["error", "never"],
            // ensure proper spacing before/after keywords
            "keyword-spacing": ["error", { "before": true, "after": true }],
            // enforce consistent spacing inside braces
            "object-curly-spacing": ["error", "always"]
        }
    }
];