/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      height: {
        mobileHeight: "h-[20px]",
        tabletHeight: "h-[36px]",
      },

      boxShadow: {
        lightMode: "0px 5px 30px 0px #5091dd",
        darkMode: "0px 5px 10px 0px #ff65001a",
        logInShadow: "0px 4px 8.3px 0px #9BA8BA",
        logInDarkShadow: "0px 4px 8.3px 0px #FF65005C 36%",
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        lightGrey: "#F4F4F4",
        global_orange: "#FF6500",
        darkGrey: "#CDCDCD",
        darkBg: " #1E1E1E",
        grayBg: "#E9E9E9",
        global_blue: "#298DFF",
        global_red: "#FF5252",
        searchBgDarkMode: "#3F3F3F",
        orange: "#FF6500",
        textBlack: "#404040",
        grayBg: "#E9E9E9",
        textGrey: " #757575",
        blueBg: "#298DFF",
        faded_global_blue: "#D3E3F7",

        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
