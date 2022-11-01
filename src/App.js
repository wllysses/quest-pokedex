import { createGlobalStyle } from "styled-components";
import AppRoutes from "./routes/Routes";
import CoolPage from './components/ScrollToTop/ScrollToTop'
import { ThemeProvider } from './contexts/theme-context'
import Navbar from "./components/Navbar/Navbar";

function App() {

  return (
      <ThemeProvider>
        <>
          <Navbar />
          <AppRoutes />
          <CoolPage />
          <GlobalStyle />
        </>
      </ThemeProvider>
  );
}

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    /* max-width: 1440px;
    margin: auto;
    background-color: #F7F7F7; */
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  }
`

export default App;