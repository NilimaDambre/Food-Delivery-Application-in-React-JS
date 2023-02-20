import './App.css';
import { createContext, useState,useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home'
import { ContactUsPage } from './components/ContactUsPage/ContactUsPage';
import Menu from './components/MenuPage/Menu'
import Header from './components/HomePage/Header/Header';
import Footer from './components/HomePage/Footer/Footer';
import FranchiseEnquiry from './components/FranchiseEnquiryPage/FranchiseEnquiry';
import Offer from './components/OffersPage/Offer';
import './variable.css';
import FoodDetails from './components/commonComponents/Food Details/FoodDetails';
import CartPage from './components/commonComponents/CartPage/CartPage';
import CheckOutPage from './components/commonComponents/CheckOutPage/CheckOutPage';


export const LoginContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [productCount, setProductCount] = useState(0);
  const [cart, setCart] = useState([]);
  // const [isInCart, setIsInCart] = useState(false)
  const [products, setProducts] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // const [user, setUser] = useState()

  //   useEffect(() => {
  //       const loggedInUser = localStorage.getItem("UserData");
  //       if (loggedInUser) {
  //           const foundUser = JSON.parse(loggedInUser);
  //           setUser(foundUser);
  //       }
  //   }, []);

  const addToCart = (product) => {
    const updatedCart = [...cart, { ...product, id: product.slug, quantity: 1 }];
    setCart(updatedCart);
    // console.log("cart", updatedCart)
    setTotalPrice(totalPrice + product.price);
    setProducts(
      products.map((p) => (p.id === product.id ? { ...p, isInCart: true,prodQuantity: 1 } : p))
    );
    setProductCount(productCount + 1);
    console.log(productCount);
    console.log("cartProducts", updatedCart)
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    const removedItem = cart.find((item) => item.id === productId);
    setProductCount(productCount - 1);
    setTotalPrice(totalPrice - removedItem.price * removedItem.quantity);
    setCart(updatedCart);
    setProducts(
      products.map((p) => (p.id === productId ? { ...p, isInCart: false } : p))
    );
  };

  const toggleDrawer = () => {
    setOpen(!isOpen);
  };

  const incrementQuantity = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        const updatedItem = { ...item, quantity: item.quantity + 1 };
        setTotalPrice(totalPrice + item.price);
        return updatedItem;
      }
      return item;
    });
    setCart(updatedCart);
  };


  const decrementQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
    item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCart(updatedCart);
  };

  return (
    <div className='App'>
      <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, decrementQuantity, productCount, removeFromCart, incrementQuantity, setProductCount, isOpen, setOpen, toggleDrawer, addToCart, totalPrice, setTotalPrice, cart, setCart, searchQuery, setSearchQuery, searchResults, setSearchResults, products }}>
        <BrowserRouter>
          <div className={isOpen ? "temp blur" : "temp"}>
            <Header />
            <div className={isOpen ? "temp blur" : "temp"} onClick={() => { setOpen(false) }}>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/contact' element={<ContactUsPage />} />
                <Route path='/menu' element={<Menu />} />
                <Route path='/franchise_enquiry' element={<FranchiseEnquiry />} />
                <Route path='/offer' element={<Offer />} />
                <Route path='/food_details/:productId' element={<FoodDetails />} />
                <Route path='/checkoutpage' element={<CheckOutPage />} />
              </Routes>
              <Footer />
            </div>
          </div>
          {isOpen && (<CartPage />)}
        </BrowserRouter>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
