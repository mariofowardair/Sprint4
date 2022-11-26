import { MuiDrawer } from '../components_mui/MuiDrawer';
import './Dashboard.css'


function Dashboard() {
  return (
    
    <div class="grid-container">
   
      <header class="header">
        <div class="header__search">Search events</div>
        <div class="header__avatar">Profile</div>
      </header>

      <MuiDrawer/>
      
      <main class="main">
        <div class="main-cards">
          <div class="card">Interactive Map</div>
          <div class="card">Upcoming</div>
          <div class="card">Pending Invites</div>
        </div>
      </main>

      <footer class="footer">
        <div class="footer__copyright">&copy; Yellow Coders</div>
        <div class="footer__signature">Made with love from Clough</div>
      </footer>
    </div>
  );
}

export default Dashboard;
