/**
 * SearchResults.tsx – Goblin Bookie
 *
 * Title:        Search Results Page
 * Purpose:      Displays card tiles matching the user's search query. Clicking a tile navigates to that card's detail page.
 * Design Notes:
 *   - Fetches cards from backend API based on the `query` URL parameter.
 *   - Child components: Header (top nav) and SearchBar (search input).
 */

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchCardsByName } from '../services/api';
import type { Card } from '../types/Card';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('query') || '';
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    fetchCardsByName(query)
      .then(setCards)
      .finally(() => setLoading(false));
  }, [query]);

  const handleSearch = (value: string) => {
    navigate(`/search?query=${encodeURIComponent(value)}`);
  };

  return (
    <div className="homepage-root">
      <Header />

      {/* Search bar at top, value is synced to URL param */}
      <div className="card shadow homepage-card searchresults-card-margin">
        <SearchBar initialValue={query} onSearch={handleSearch} />
      </div>

      {/* Section heading shows the current query */}
      <h2 className="searchresults-title searchresults-title-margin">
        Search Results for <span className="searchresults-query">"{query}"</span>
      </h2>
      {loading && <div>Loading…</div>}
      {!loading && cards.length === 0 && <div>No results found.</div>}

      <div className="searchresults-grid">
        {cards.map((card) => (
          <div
            key={card.uuid}
            className="searchresults-card card-hover searchresults-card-pointer"
            onClick={() => navigate(`/card/${card.uuid}`)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') navigate(`/card/${card.uuid}`);
            }}
            aria-label={`View details for ${card.name}`}
          >
            <img
              src={card.imageUrl || '/placeholder.png'}
              alt={card.name}
              className="searchresults-article-img"
            />
            <strong className="homepage-article-title">{card.name}</strong>
            <p className="homepage-article-desc">{card.set}</p>
            <div className="searchresults-stats">
              {card.avgRetail === null &&
              card.avgBuylist === null &&
              card.weeklyChangePct === null ? (
                <span className="searchresults-no-price">
                  Whoops! – Can’t find a price
                  <br />
                  The goblins got hungry and ate the price slip.
                </span>
              ) : (
                <>
                  {card.avgRetail !== null && (
                    <>
                      Average Retail: ${card.avgRetail.toFixed(2)}
                      <br />
                    </>
                  )}
                  {card.avgBuylist !== null && (
                    <>
                      Average Buylist: ${card.avgBuylist.toFixed(2)}
                      <br />
                    </>
                  )}
                  {card.weeklyChangePct !== null && (
                    <span
                      className={
                        card.weeklyChangePct < 0
                          ? 'searchresults-weeklychange-neg'
                          : 'searchresults-weeklychange-pos'
                      }
                    >
                      Weekly Change: {card.weeklyChangePct > 0 && '+'}
                      {card.weeklyChangePct.toFixed(1)}%
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
