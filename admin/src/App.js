import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { userInputs } from "./formSource";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import {
  childPitchColumns,
  pitchColumns,
  userColumns,
} from "./datatablesource";
import NewPitch from "./pages/newPitch/NewPitch";
import UpdatePitch from "./pages/updatePitch/UpdatePitch";
import NewChildPitch from "./pages/newChildPitch/newChildPitch";

function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={userColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New inputs={userInputs} title="Add New User" />
                  </ProtectedRoute>
                }
              />
              {/* <Route
                path="update"
                element={
                  <ProtectedRoute>
                    <New inputs={userInputs} title="Update New User" />
                  </ProtectedRoute>
                }
              /> */}
            </Route>
            <Route path="pitchs">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={pitchColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewPitch />
                  </ProtectedRoute>
                }
              />
              <Route
                path="update/:idPitch"
                element={
                  <ProtectedRoute>
                    <UpdatePitch />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="childPitchs">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={childPitchColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewChildPitch />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;