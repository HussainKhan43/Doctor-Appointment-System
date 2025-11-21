// src/components/PublicLayout.jsx
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <>
      <Header />
      <Outlet />  {/* Yaha Home, About, etc aayenge */}
      <Footer />
    </>
  );
};

export default PublicLayout;