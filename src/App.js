import './styles/App.css';
import Title from './components/MainTitle';
import MainContent from './components/MainContent';

function App() {
  return (
    // L'application avec son titre principale et son contenu
    <div className="App">
      <Title/>
      <MainContent/>
    </div>
  );
}

export default App;