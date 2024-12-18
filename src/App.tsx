import { Layout } from './components/layout/layout'
import { NavLink } from 'react-router'
import { PrincipalScreen } from './pages/main/FirstScreen'


function App() {
  
  return(
    <Layout>
      <PrincipalScreen />
    </Layout>
  );
}

export default App;
