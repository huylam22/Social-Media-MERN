import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "scenes/homePage/HomePage";
import LoginPage from "scenes/loginPage/LoginPage";
import ProfilePage from "scenes/profilePage/ProfilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";

function App() {
  const mode = useSelector((state) => state.mode); // get initial mode from redux store
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); // create theme based on mode
  const isAuth = Boolean(useSelector((state) => state.token)); // check if user is logged in
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage></LoginPage>} />
            <Route
              path="/home"
              element={isAuth ? <HomePage></HomePage> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={
                isAuth ? <ProfilePage></ProfilePage> : <Navigate to="/" />
              }
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
