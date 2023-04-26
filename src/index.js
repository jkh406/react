import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        render={({ history, location, match }) => {
          console.log('location.pathname', location.pathname);

          const Page = lazy(() =>
            import("com/anbtech/webffice/pages" + location.pathname).catch((e) => {
              if (/not find module/.test(e.message)) {
                console.log('location.pathname', location.pathname);
                // return import("./pages/NotFound.js");
              }
              if (/Loading chunk \d+ failed/.test(e.message)) {
                window.location.reload();
                return;
              }
              throw e;
            })
          );
          console.log('location.pathname', location.pathname);
          return (
            <Suspense fallback={<div>Loading..</div>}>
              <Page />
            </Suspense>
          );
        }}
      />
    </Routes>
    <App />
</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
