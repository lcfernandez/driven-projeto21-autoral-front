import { GlobalStyle } from "./assets/styles/GlobalStyle";
import { ProjectPage } from "./pages/ProjectPage/ProjectPage";
import { ProjectsPage } from "./pages/ProjectsPage/ProjectsPage";
import { SignInPage } from "./pages/SignInPage/SignInPage";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";
import { UserContext } from "./contexts/UserContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";

export function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token") || undefined
  );

  return (
    <>
      <GlobalStyle />

      <UserContext.Provider value={[token, setToken]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectPage />} />
            <Route index path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}
