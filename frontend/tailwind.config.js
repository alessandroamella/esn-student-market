// eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
        colors: {
            transparent: "transparent",
            current: "currentColor",
            black: colors.black,
            white: colors.white,
            rose: colors.rose,
            pink: colors.pink,
            fuchsia: colors.fuchsia,
            purple: colors.purple,
            fuchsia: colors.fuchsia,
            indigo: colors.indigo,
            blue: colors.blue,
            sky: colors.sky,
            cyan: colors.cyan,
            teal: colors.teal,
            emerald: colors.emerald,
            green: colors.green,
            lime: colors.lime,
            yellow: colors.yellow,
            amber: colors.amber,
            orange: colors.orange,
            red: colors.red,
            slate: colors.slate,
            zinc: colors.zinc,
            gray: colors.gray,
            neutral: colors.blueGray,
            stone: colors.stone
        }
    },
    plugins: []
};
