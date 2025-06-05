import { useEffect, useState } from 'react';
import { fetchSampleCards } from './services/cardService';

function App() {
  const [cards, setCards] = useState<any[]>([]);

  useEffect(() => {
    fetchSampleCards().then(setCards).catch(console.error);
  }, []);

  return (
    <div className="container py-4">
      <h1 className="mb-3">Goblin Bookie</h1>
      <ul className="list-group">
        {cards.map((card, idx) => (
          <li className="list-group-item" key={idx}>
            <strong>{card.name}</strong> – Set: {card.set}, TCG ID: {card.tcgplayerId}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
