import { Container, CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Headers from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingCompnent";
import CheckoutPage from "../checkout/CheckoutPage";
import { useAppDispatch } from "../Store/configureStore";
import { setBasket } from "../../features/basket/basketSlice";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEnhancedEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
      .then(basket => dispatch(setBasket(basket)))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
    } else{
      setLoading(false);
    }
  }, [dispatch])

  const [darkMode, setDarkMode] = useState(false);
  const palettetype = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: palettetype,
      background: {
        default: palettetype === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  if (loading) {
    return <LoadingComponent message="Initialising app..."/>
  }
  
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
      <CssBaseline />
      <Headers darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container>
        <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/catalog' component={Catalog} />
        <Route path='/catalog/:id' component={ProductDetails} />
        <Route path='/about' component={AboutPage} />
        <Route path='/contact' component={ContactPage} />
        <Route path='/server-error' component={ServerError} />
        <Route path='/basket' component={BasketPage} />
        <Route path='/checkout' component={CheckoutPage} />
        <Route component={NotFound} />
        </Switch>
      </Container>
      
    </ThemeProvider>
  );
}

export default App;
