/**
 * Homepage.tsx – Goblin Bookie
 *
 * Title:        Homepage / Landing Page
 * Purpose:      Main app entry point. Lets users search for card prices and displays sample news articles.
 * Design Notes:
 *   - Static list of "articles" as demo content; real articles could be fetched later.
 *   - Handles search input and navigation to SearchResults page.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

// Demo article data (replace with API call if/when needed)
const articles = [
  {
    img: '/news1.png',
    title: 'Weekly Update (Jul 06): Big Standard Bannings',
    desc: 'This week in MTG news: Big Standard Bannings.',
  },
  {
    img: '/news2.png',
    title: 'Against the Odds: Jumbo Cactuar (Standard)',
    desc: 'What are the odds of winning with a single attack for 10,000 with Jumbo Cactuar?',
  },
  {
    img: '/news3.png',
    title: 'Vintage 101: Cats in the Cradle',
    desc: 'Joe Dyer dives into no changes for Vintage on the June 30 BNR!',
  },
];

const Homepage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Handle form submit to trigger search
  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  }

  return (
    <div className="homepage-root">
      <Header />

      {/* Price Search Card */}
      <div className="card shadow homepage-card">
        <h2 className="homepage-title homepage-section-margin">Price Search</h2>
        <form className="homepage-searchbar" onSubmit={handleSearch}>
          <input
            className="form-control"
            placeholder="Search…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-success homepage-search-btn homepage-btn-padding"
          >
            Search
          </button>
        </form>
      </div>

      {/* Articles Card: sample news/updates */}
      <div className="card shadow homepage-card">
        <h3 className="homepage-subtitle homepage-section-margin">New Articles</h3>
        <div className="homepage-articles-row">
          {articles.map((a, idx) => (
            <div key={idx} className="article-tile card-hover homepage-article-tile">
              <img src={a.img} alt={a.title} className="homepage-article-img" />
              <strong className="homepage-article-title">{a.title}</strong>
              <p className="homepage-article-desc">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
