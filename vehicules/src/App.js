import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Route ,Routes } from 'react-router-dom';
import InsertMarque from './InsertMarque';
import InsertCategorie from './InsertCategorie';
import Ensemble from './Ensemble';
import InsertTypeCarburant from './InsertTypeCarburant';
import InsertFonctionnalite from './InsertFonctionnalite';
import InsertModele from './InsertModele';
import InsertSousModele from './InsertSousModele';
import InsertInteret from './InsertInteret';
import InsertChoixFonctionnalite from './InsertChoixFonctionnalite';
import Message from './components/Message';
import NotificationService from './NotificationService';

function App() {
  return (
    // <>
    //   <Routes>
    //     <Route path='/' element= {<Message/>} />
    //     {/* <Route path='/' element= {<Ensemble/>} /> */}
    //     {/* <Route path='/insert-marque' element= {<InsertMarque/>}/>
    //     <Route path='/insert-categorie' element= {<InsertCategorie/>}/>
    //     <Route path='/insert-type' element= {<InsertTypeCarburant/>}/>
    //     <Route path='/insert-fonctionnalite' element={<InsertFonctionnalite/>}/>
    //     <Route path='/insert-modele' element={<InsertModele/>}/>
    //     <Route path='/insert-sousModele' element={<InsertSousModele/>}/>
    //     <Route path='/insert-interet' element={<InsertInteret/>}/>
    //     <Route path='/insert-ChoixFonctionnalite' element={<InsertChoixFonctionnalite/>}/> */}
    //   </Routes>
    // </>
      <NotificationService />

  );
}

export default App;
