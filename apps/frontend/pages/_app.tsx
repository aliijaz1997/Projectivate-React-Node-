import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "~/web/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContainer } from "~/web/layouts/AppContainer";
import "@fullcalendar/common/main.css";
import "../web/features/calender/FullCalender.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppContainer>
        <Component {...pageProps} />
      </AppContainer>
      <ToastContainer position="bottom-right" autoClose={5000} />
    </Provider>
  );
}
export default MyApp;
