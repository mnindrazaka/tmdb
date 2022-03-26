import "regenerator-runtime/runtime";
import ReactDOM from "react-dom";
import App from "@/App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "@/utils/query/Query.context";

ReactDOM.render(
  <BrowserRouter>
    <ChakraProvider>
      <Provider>
        <App />
      </Provider>
    </ChakraProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
