import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={""}>
        {children}
      </body>
    </html>
  );
}
