/**
 * HeaderBar.tsx – Goblin Bookie
 *
 * Title:        Top Navigation Bar / Header
 * Purpose:      Sticks to the top of the page, showing the app logo and name. Provides a home link.
 * Design Notes:
 *   - Image and title link to home.
 *   - No internal nav logic; just visual branding/navigation.
 */
const HeaderBar: React.FC = () => (
  <header className="goblin-header-bar">
    <div className="goblin-header-inner">
      <a href="/" className="goblin-header-home-link">
        <img src="/goblinLogo.png" alt="Goblin Bookie Logo" className="goblin-header-logo-img" />
        <span className="goblin-header-title">Goblin Bookie</span>
      </a>
    </div>
  </header>
);
export default HeaderBar;
