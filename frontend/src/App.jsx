import {Container} from "react-bootstrap";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import {Outlet} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from "react-toastify";

function App() {

  return (
    <>
        <Header />
        <main className='py-3'>
            <Container>
                <Outlet />
            </Container>
        </main>
        <Footer />
        <ToastContainer />
    </>
  )
}

export default App
