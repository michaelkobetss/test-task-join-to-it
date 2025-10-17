import './app.sass';
import Layout from "./components/Layout";
import CalendarView from "./components/Calendar.jsx";
function App() {
    return (
        <Layout>
            <div>
                <h1>Calendar</h1>
                <CalendarView />
            </div>
        </Layout>
    );
}

export default App;