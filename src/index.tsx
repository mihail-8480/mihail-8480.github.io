import React, { Suspense } from "react";
import('react-dom/client').then(ReactDOMClient => {
    const App = React.lazy(() => import("./app"))
    const root = ReactDOMClient.createRoot(document.getElementById('root'))

    root.render(<React.StrictMode>
        <Suspense>
            <App />
        </Suspense>
    </React.StrictMode>);
})
