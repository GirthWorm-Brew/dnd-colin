import MainLayout from "./components/MainLayout";
import "./styles/Style.css";
import Router from "./routes";

export default function App() {
  return (
    <MainLayout>
      <Router />
    </MainLayout>
  );
}
