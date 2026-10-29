import "./globals.css";

export const metadata = {
  title: "Student Race | Build Your First AI Project in 60 Minutes",
  description: "Free live workshop for final-year engineering students. Join the clan, invite friends and top the leaderboard.",
};

export const viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" />
      </head>
      <body>
        <div className="shell">{children}</div>
      </body>
    </html>
  );
}
