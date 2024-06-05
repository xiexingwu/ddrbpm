import "~/globals.css";

import { GeistSans } from "geist/font/sans";

export const metadata = {
    title: "DDR BPM",
    description: "The DDR Companion",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${GeistSans.variable}`}>
            <Header />
            {children}
        </html>
    );
}

const Header = () => (
    <>
        <head>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <meta name="description" content="DDR BPM Web" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="shortcut icon" type="image/ico" href="/favicon.ico" />
            <link rel="apple-touch-icon" href="/icons/apple-icon-180.png" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <link
                rel="apple-touch-startup-image"
                href="/icons/apple-splash-dark-2048-2732.jpg"
                media="(prefers-color-scheme: dark) and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            />
            <link
                rel="apple-touch-startup-image"
                href="/icons/apple-splash-dark-1668-2388.jpg"
                media="(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            />
            <link
                rel="apple-touch-startup-image"
                href="/icons/apple-splash-dark-1536-2048.jpg"
                media="(prefers-color-scheme: dark) and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            />
            <link
                rel="apple-touch-startup-image"
                href="/icons/apple-splash-dark-1668-2224.jpg"
                media="(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            />
            <link
                rel="apple-touch-startup-image"
                href="/icons/apple-splash-dark-1620-2160.jpg"
                media="(prefers-color-scheme: dark) and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            />
            <link
                rel="apple-touch-startup-image"
                href="/icons/apple-splash-dark-1284-2778.jpg"
                media="(prefers-color-scheme: dark) and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
            />
            <link
                rel="apple-touch-startup-image"
                href="/icons/apple-splash-dark-1170-2532.jpg"
                media="(prefers-color-scheme: dark) and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
            />
            <link
                rel="apple-touch-startup-image"
                href="/icons/apple-splash-dark-1125-2436.jpg"
                media="(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
            />
            <link
                rel="apple-touch-startup-image"
                href="/icons/apple-splash-dark-1242-2688.jpg"
                media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
            />
            <link
                rel="apple-touch-startup-image"
                href="/icons/apple-splash-dark-828-1792.jpg"
                media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            />
            <link
                rel="apple-touch-startup-image"
                href="/icons/apple-splash-dark-1242-2208.jpg"
                media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
            />
            <link
                rel="apple-touch-startup-image"
                href="/icons/apple-splash-dark-750-1334.jpg"
                media="(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            />
            <link
                rel="apple-touch-startup-image"
                href="/icons/apple-splash-dark-640-1136.jpg"
                media="(prefers-color-scheme: dark) and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            />
        </head>
    </>
);
