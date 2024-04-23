import { Provider, useDispatch, useSelector } from "react-redux";
import { RootState, store } from "./store";
import { GuessTheType } from "./components/pages/GuessTheType";
import { Header } from "./components/Header";
import { Home } from "./components/pages/Home";
import { useEffect } from "react";
import { setTheme } from "./slices/ThemeSlice";
import { GuessTheSilhouette } from "./components/pages/GuessTheSilhouette";
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import { GuessTheCry } from "./components/pages/GuessTheCry";

const router = createHashRouter([
  {
    path: "/",
    element: (<>
      <Header/>
      <div id={`content`} style={{ position: "relative" }}>
        <Home/>
      </div>
    </>)
  },
  {
    path: "/type",
    element: (<>
      <Header/>
      <div id={`content`} style={{ position: "relative" }}>
        <GuessTheType/>
      </div>
    </>)
  },
  {
    path: "/silhouette",
    element: (<>
      <Header/>
      <div id={`content`} style={{ position: "relative", display:"flex", justifyContent:"center", alignItems:"center" }}>
        <GuessTheSilhouette/>
      </div>
    </>)
  },
  {
    path: "/cry",
    element: (<>
      <Header/>
      <div id={`content`} style={{ position: "relative", display:"flex", justifyContent:"center", alignItems:"center" }}>
        <GuessTheCry/>
      </div>
    </>)
  }
]);

function AppContent() {

  const theme = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    let theme = localStorage.getItem('theme') || 'light';
    dispatch(setTheme(theme));
  },[]);

  return (
    <>
      <div
        id="app"
        className={`theme-${theme}`}
        >
        <RouterProvider router={router}/>
      </div>
    </>
  )
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;