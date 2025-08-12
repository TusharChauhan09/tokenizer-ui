import localFont from "next/font/local";

export const jap = localFont({
    src: [
      {
        path: "../../public/fonts/Geishta.otf",
        weight: "400",
      },
    ],
    variable: "--font-jap",
  });