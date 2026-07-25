import ConditionalNavbar from '../components/conditional-navbar';
import SmoothScroll from '@/components/smooth-scroll'
import './globals.css';

export const metadata = {
  title: 'Parrot',
  description: 'The all-in-one platform for effortless learning and teaching.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-blue-50 via-white to-orange-50">
        <SmoothScroll/>
        <ConditionalNavbar />
        {children}
      </body>
    </html>
  );
}
