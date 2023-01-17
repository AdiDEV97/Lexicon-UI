//import logo from './logo.svg';
import './App.css';
import Header from './features/Header/Container/Header';
import Grid from '@material-ui/core/Grid'
import Footer from './features/Footer/Container/Footer';
import SideNav from './features/SideNav/Container/SideNav';
import Routers from './routes';
import { useState } from 'react';

function App() {

  const [wordLen, setWordLen] = useState();

  function addWord_to_app(data) {
    setWordLen(data);
  }

  return (
    <div className="App">
      <Header />
      <Grid className='fullGrid' item container>
        <Grid className="grid1" item lg={3}>
          <SideNav style={{position:'sticky', top:0}}/>
        </Grid>
        <Grid className="grid2" item lg={9}>
          <Routers />
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default App;
