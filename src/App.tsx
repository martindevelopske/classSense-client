import { useEffect, FC } from "react";
import { getApp } from "./lib/utils";
import { BrowserRouter } from "react-router-dom";
import HomeRouter from "./routers/homeRouter";
import Wrapper from "./components/wrapper";

const App: FC = () => {
  const AppRouter = getApp();

  return (
    <BrowserRouter>
      <Wrapper>
        <AppRouter />
      </Wrapper>
    </BrowserRouter>
  );
};
export default App;
