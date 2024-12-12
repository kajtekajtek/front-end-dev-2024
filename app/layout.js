// app/layout.js - root app layout
import '../styles/styles.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <h1>GameDex</h1>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}