import { store } from "./store/store";
import { Provider } from "react-redux";
import { TaskList, Layout, CreateTask } from './views/index';
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Layout />}>
            <Route index element={<TaskList />} />
            <Route path="create" element={<CreateTask />} />
            {/* <Route path="dashboard" element={<Dashboard />} /> */}

            {/* Using path="*"" means "match anything", so this route
                  acts like a catch-all for URLs that we don't have explicit
                  routes for. */}
            {/* <Route path="*" element={<NoMatch />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

// function Layout() {
//   return (
//     <div>
//       {/* A "layout route" is a good place to put markup you want to
//           share across all the pages on your site, like navigation. */}
//       <nav>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/about">About</Link>
//           </li>
//           <li>
//             <Link to="/dashboard">Dashboard</Link>
//           </li>
//           <li>
//             <Link to="/nothing-here">Nothing Here</Link>
//           </li>
//         </ul>
//       </nav>

//       <hr />

//       {/* An <Outlet> renders whatever child route is currently active,
//           so you can think about this <Outlet> as a placeholder for
//           the child routes we defined above. */}
//       <Outlet />
//     </div>
//   );
// }

export default App
