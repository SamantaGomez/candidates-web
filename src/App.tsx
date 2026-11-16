
import { Header } from "./components/Header";
import { CandidatesPage } from "./pages/CandidatesPage";

const App = () => {
  return (
    <div>
      <Header />
      <main className="container">
        <CandidatesPage />
      </main>
    </div>
  );
};

export default App;
