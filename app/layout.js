import '../app/globals.css';
import SmoothScroll from '../components/smooth-scroll';
import Navbar from '../components/navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
