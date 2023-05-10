// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from "react-router-dom";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Pitch from "./pages/pitch/Pitch";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Payment from "./pages/payment/Payment";
import Orders from "./pages/orders/Orders";
import Success from "./pages/success/Success";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Matching from "./pages/matching/Matching";
import MatchingShared from "./pages/matchingShared/MatchingShared";
import Register from "./pages/register/Register";
import { ToastContainer, toast } from "react-toastify";
import CreateMessage from "./pages/createMessage/CreateMessage";


function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <ToastContainer />
          <Outlet />
        </QueryClientProvider>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/pitchs",
          element: <List />,
        },
        {
          path: "/pitchs/:id",
          element: <Pitch />,
        },
        {
          path: "/orders/:userId",
          element: <Orders />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/createMessage",
          element: <CreateMessage />,
        },
        {
          path: "/payment/:ordersId",
          element: <Payment />,
        },
        {
          path: "/success",
          element: <Success />,
        },
        {
          path: "/matching",
          element: <Matching />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;

  // return (
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path="/" element={<Home/>}/>
  //         <Route path="/login" element={<Login/>}/>
  //         <Route path="/pitchs" element={<List/>}/>
  //         <Route path="/pitchs/:id" element={<Pitch/>}/>
  //         <Route path="/orders" element={<Orders/>}/>
  //         <Route path="/payment/:id" element={<Payment/>}/>
  //         <Route path="/success" element={<Success/>}/>
  //         <Route path="/matching" element={<Matching/>}/>
  //         <Route path="/messages" element={<Messages/>}/>
  //         <Route path="/message/:id" element={<Message/>}/>
  //       </Routes>
  //     </BrowserRouter>
  // );
}
export default App;
