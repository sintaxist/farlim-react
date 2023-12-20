import React from 'react'
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/pages';
import { Footer } from './components/footer';
import ScrollToTop from './components/utils/ScrollToTop';
import './styles/App.scss'
import { CategoryDetail } from './components/pages/CategoryDetail';
import Categoria from './components/pages/categorias';
import QuienesSomos from './components/pages/quienes-somos';
import Faqs from './components/pages/faq';
import Capacitate from './components/pages/capacitate';
import Contacto from './components/pages/contacto';
import Productos from './components/pages/productos';
import { ProductDetail } from './components/pages/productDetails';

function App () {

  return (
    <div id='page-container'>
      <Router>
        <ScrollToTop />
        <Navbar/>
        <div id="content-wrap">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="producto/:productId" element={<ProductDetail />}></Route>
            <Route path="categoria/:categoryId" element={<CategoryDetail />}></Route>
            <Route path="categorias" element={<Categoria />}></Route>
            <Route path="quienes-somos" element={<QuienesSomos />}></Route>
            <Route path="contacto" element={<Contacto />}></Route>
            <Route path="faq" element={<Faqs />}></Route>
            <Route path="capacitate" element={<Capacitate />}></Route>
            <Route path="productos" element={<Productos />}></Route>
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  )
}

export default App;
