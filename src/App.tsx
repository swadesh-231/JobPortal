import { BrowserRouter, Route, Routes } from "react-router";
import LogInPage from "@/app/login/page";
import Page from "@/app/page";
import SignUpPage from "@/app/signup/page";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { siteConfig } from "@/config/site";

function App() {
  return (
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path={siteConfig.routes.logIn} element={<LogInPage />} />
          <Route path={siteConfig.routes.signUp} element={<SignUpPage />} />
          {/* Every other path still shows the landing page */}
          <Route path="*" element={<Page />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-center" />
    </TooltipProvider>
  );
}

export default App;
