import { Container } from "react-bootstrap";
import {BrowserRouter} from "react-router-dom"
import Router from "./router";
function App() {
  return (
    
    <BrowserRouter>
      <Container>
        <Router />
      </Container>

    </BrowserRouter>

  );
}

export default App;