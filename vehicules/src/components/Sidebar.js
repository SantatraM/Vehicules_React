import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';


const Sidebar = () => {
    return (
      
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
              <ul className="nav">
              <li className="nav-item">
                <div className="nav-search">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Type to search..." aria-label="search" aria-describedby="search"/>
                    <div className="input-group-append">
                      <span className="input-group-text" id="search">
                        <i className="typcn typcn-zoom"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <p className="sidebar-menu-title">Dash menu</p>
              </li>

              <li className="nav-item">
                {/* Utilisez le composant Link pour créer le lien */}
                <Link to="/insert-marque" className="nav-link">
                  <i className="typcn typcn-briefcase menu-icon"></i>
                  <span className="menu-title">Marque</span>
                </Link>
              </li>

              <li className="nav-item">
                {/* Utilisez le composant Link pour créer le lien */}
                <Link to="/insert-categorie" className="nav-link">
                  <i className="typcn typcn-briefcase menu-icon"></i>
                  <span className="menu-title">Categorie</span>
                </Link>
              </li>

              <li className="nav-item">
                {/* Utilisez le composant Link pour créer le lien */}
                <Link to="/insert-type" className="nav-link">
                  <i className="typcn typcn-briefcase menu-icon"></i>
                  <span className="menu-title">Type Carburant</span>
                </Link>
              </li>


              <li className="nav-item">
                {/* Utilisez le composant Link pour créer le lien */}
                <Link to="/insert-fonctionnalite" className="nav-link">
                  <i className="typcn typcn-briefcase menu-icon"></i>
                  <span className="menu-title">Fonctionnalite technologique</span>
                </Link>
              </li>
              <li className="nav-item">
                {/* Utilisez le composant Link pour créer le lien */}
                <Link to="/insert-ChoixFonctionnalite" className="nav-link">
                  <i className="typcn typcn-briefcase menu-icon"></i>
                  <span className="menu-title"> Choix Fonctionnalite technologique</span>
                </Link>
              </li>

              <li className="nav-item">
                {/* Utilisez le composant Link pour créer le lien */}
                <Link to="/insert-modele" className="nav-link">
                  <i className="typcn typcn-briefcase menu-icon"></i>
                  <span className="menu-title"> Modele</span>
                </Link>
              </li>

              <li className="nav-item">
                {/* Utilisez le composant Link pour créer le lien */}
                <Link to="/insert-sousModele" className="nav-link">
                  <i className="typcn typcn-briefcase menu-icon"></i>
                  <span className="menu-title"> Sous modele</span>
                </Link>
              </li>

              <li className="nav-item">
                {/* Utilisez le composant Link pour créer le lien */}
                <Link to="/insert-interet" className="nav-link">
                  <i className="typcn typcn-briefcase menu-icon"></i>
                  <span className="menu-title"> Interet</span>
                </Link>
              </li>
              

            </ul>
          </nav>
            
    );
}
export default Sidebar;