import {StrictMode, lazy} from "react";
import { Suspense } from "react";
import('react-dom/client').then(ReactDOMClient => {
    const App = lazy(() => import("./app"))
    const root = ReactDOMClient.createRoot(document.getElementById('root'))

    root.render(<StrictMode>
        <Suspense>
            <App />
        </Suspense>
    </StrictMode>);
})
