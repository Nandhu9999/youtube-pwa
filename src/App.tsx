import { Outlet } from "react-router-dom";
import Header from "./components/common/Header.tsx";

function App() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#f1d4b3] font-sans">
      <h1 className="text-lg font-bold">Youtube PWA <span className="text-sm font-normal">v1.3.0</span></h1>
      <main className="relative grid h-[92%] max-h-full w-[95%] grid-rows-[42px_7fr] overflow-hidden rounded-[8px] bg-[#fff] md:h-[685px] md:w-[972px]">
        <Header />
        <Outlet />
      </main>
    </div>
  );
}

export default App;
