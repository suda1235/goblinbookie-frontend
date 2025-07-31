/**
 * CardDetailPage.tsx – Goblin Bookie
 *
 * Title:        Card Detail Page
 * Purpose:      Shows all detailed info for a single Magic: The Gathering card, including price history chart,
 *               stat tiles, and vendor price breakdowns.
 * Design Notes:
 *   - Fetches card data using UUID from route params.
 *   - Handles loading and "not found" states.
 *   - Uses helper functions for stat and vendor price formatting.
 */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCardDetails } from '../services/api';
import type { CardDetail, Vendor } from '../types/CardDetail';
import Header from '../components/Header';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const STAT_TILES = [
  { key: 'avgRetail', label: 'Retail Price (AVG)', type: 'retail', stat: 'avg', icon: '💸' },
  { key: 'avgBuylist', label: 'Buylist Price (AVG)', type: 'buylist', stat: 'avg', icon: '🪙' },
  { key: 'lowRetail', label: 'Retail (Low)', type: 'retail', stat: 'low', icon: '⬇️' },
  { key: 'highBuylist', label: 'Buylist (High)', type: 'buylist', stat: 'high', icon: '⬆️' },
];

function statTileValue(
  card: CardDetail | null,
  type: 'retail' | 'buylist',
  stat: 'low' | 'avg' | 'high',
) {
  if (!card) return null;
  return card.prices[type]?.normal?.[stat] ?? null;
}

function vendorPrice(v: Vendor, type: 'retail' | 'buylist', finish: string = 'normal') {
  const val = v.prices?.[type]?.[finish];
  return typeof val === 'number'
    ? `$${val.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
    : '—';
}

const CardDetailPage: React.FC = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const [card, setCard] = useState<CardDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!uuid) return;
    setLoading(true);
    setNotFound(false);
    fetchCardDetails(uuid)
      .then(setCard)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [uuid]);

  const chartData = card
    ? card.history.map((h) => ({
        date: h.date,
        retail: h.retail.normal ?? null,
        buylist: h.buylist.normal ?? null,
      }))
    : [];

  return (
    <div className="homepage-root">
      <Header />
      <div className="card shadow homepage-card carddetail-maincard">
        {loading ? (
          <div>Loading…</div>
        ) : notFound ? (
          <div className="carddetail-error">Goblin error: Card not found!</div>
        ) : (
          card && (
            <>
              {/* Stat Tiles */}
              <div className="carddetail-stat-tiles">
                {STAT_TILES.map((tile) => (
                  <div key={tile.key} className="detail-stat-tile">
                    <div className="carddetail-stat-icon">{tile.icon}</div>
                    <div className="carddetail-stat-label">{tile.label}</div>
                    <div className="detail-stat-value">
                      {statTileValue(card, tile.type as any, tile.stat as any) != null
                        ? `$${statTileValue(card, tile.type as any, tile.stat as any)!.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
                        : '—'}
                    </div>
                  </div>
                ))}
              </div>

              {/* Card Info and Price History Chart */}
              <div className="carddetail-info-chartrow">
                <div className="carddetail-infoblock">
                  <img
                    src={card.imageUrl || '/placeholder.png'}
                    alt={card.name}
                    className="carddetail-image"
                  />
                  <h2 className="carddetail-name">{card.name}</h2>
                  <div className="carddetail-metadata">
                    Set: {card.set}, Language: {card.language}
                  </div>
                  <div className="carddetail-finishes">
                    Finish{card.finishes.length > 1 ? 'es' : ''}: {card.finishes.join(', ')}
                  </div>
                </div>
                <div className="carddetail-chartblock">
                  <div className="carddetail-chart-title">Overview</div>
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={chartData}>
                      <XAxis dataKey="date" hide />
                      <YAxis domain={['auto', 'auto']} width={36} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="retail"
                        stroke="#1FCB4F"
                        name="Retail"
                        dot={false}
                        connectNulls
                      />
                      <Line
                        type="monotone"
                        dataKey="buylist"
                        stroke="#ffd236"
                        name="Buylist"
                        dot={false}
                        connectNulls
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Vendor price table */}
              <div>
                <div className="carddetail-vendor-title">Vendor Prices</div>
                <table className="carddetail-vendor-table">
                  <thead>
                    <tr className="carddetail-vendor-header">
                      <th className="carddetail-vendor-th">Vendor</th>
                      <th className="carddetail-vendor-th">Retail</th>
                      <th className="carddetail-vendor-th">Buylist</th>
                      <th className="carddetail-vendor-th"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {card.vendors.map((v: Vendor) => (
                      <tr key={v.vendor} className="carddetail-vendor-row">
                        <td className="carddetail-vendor-name">{v.vendor}</td>
                        <td>{vendorPrice(v, 'retail')}</td>
                        <td>{vendorPrice(v, 'buylist')}</td>
                        <td>
                          {v.purchaseUrl && (
                            <a
                              href={v.purchaseUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="carddetail-vendor-link"
                            >
                              Buy Now
                            </a>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default CardDetailPage;
