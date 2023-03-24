import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GlobalStyle } from "./assets/styles/GlobalStyle";
import { ProjectPage } from './pages/ProjectPage/ProjectPage';
import { ProjectsPage } from './pages/ProjectsPage/ProjectsPage';
import { SignInPage } from './pages/SignInPage/SignInPage';
import { SignUpPage } from './pages/SignUpPage/SignUpPage';

function App() {
  return (
    <>
      <GlobalStyle />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/project" element={<ProjectPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
