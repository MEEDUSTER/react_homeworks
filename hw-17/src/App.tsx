import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { NewsListPage } from "./pages/NewsListPage";
import { NewsDetailPage } from "./pages/NewsDetailPage";

const Layout = () => {
  return (
    <div className="min-h-screen pb-16 text-[#e6e2d6]">
      <Header />
      <main className="mx-auto max-w-6xl px-4">
        <Outlet />
      </main>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <NewsListPage />,
      },
      {
        path: "news/:id",
        element: <NewsDetailPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
