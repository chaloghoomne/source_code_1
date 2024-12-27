'use client'; // Required for client-side use

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/redux/store';
import './globals.css';
import Navbar from './CommonComponents/navbar/Navbar';
import Footer from './CommonComponents/footer/Footer';
import { usePathname } from 'next/navigation';
import { ToastContainer } from 'react-toastify';

export default function RootLayout({ children }) {
  const pathName = usePathname();
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {!(
              pathName === "/login" ||
              pathName === "/signup" ||
              pathName === "/forgot-password"
            ) && <Navbar />}
            {children}
            {!(
              pathName === "/login" ||
              pathName === "/signup" ||
              pathName === "/forgot-password"
            ) && <Footer />}
            <ToastContainer />
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
