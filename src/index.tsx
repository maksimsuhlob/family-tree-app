import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {RouterProvider,} from "react-router-dom";
import router from "./router/router";
import i18n from "./utils/translations";
import {I18nextProvider} from "react-i18next";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "./theme/theme";
import {NotificationProvider} from "./utils/notifications";
import {AuthProvider} from "./utils/auth";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <I18nextProvider i18n={i18n} defaultNS={'translation'}>
                <NotificationProvider>
                    <AuthProvider>
                        <RouterProvider router={router}/>
                    </AuthProvider>
                </NotificationProvider>
            </I18nextProvider>
        </ThemeProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
