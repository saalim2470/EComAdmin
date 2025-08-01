import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import "swiper/swiper-bundle.css"
import "flatpickr/dist/flatpickr.css"
import App from "./App.jsx"
import { AppWrapper } from "./components/common/PageMeta.jsx"
import { ThemeProvider } from "./context/ThemeContext.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AppWrapper>
        <App />
      </AppWrapper>
    </ThemeProvider>
  </StrictMode>
)
