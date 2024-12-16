// app/layout.js - root app layout
import '../styles/global.css'

// root layout contains the navigation bar and the main content
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav className="nav__global">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/pokemon">Pokemon</a></li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}