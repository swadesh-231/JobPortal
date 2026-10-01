import Page from "@/app/page";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  return (
    <TooltipProvider>
      <Page />
      <Toaster position="bottom-center" />
    </TooltipProvider>
  );
}

export default App;
