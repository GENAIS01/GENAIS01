/**
 * Trend Engine – SEO Forecast Module
 * Analyzes keyword history and predicts future performance trends.
 */

function calculateTrajectory(history = []) {
  // history: [{ date: '2024-01', rank: 34, ctr: 0.03, visits: 21 }, ...]
  if (history.length < 3) {
    return { trend: 'insufficient data', confidence: 0.2 };
  }

  const sorted = [...history].sort((a, b) => new Date(a.date) - new Date(b.date));
  const ranks = sorted.map(p => p.rank);
  const ctrs = sorted.map(p => p.ctr);
  const visits = sorted.map(p => p.visits);

  const avgRankChange = (ranks[0] - ranks[ranks.length - 1]) / ranks.length;
  const avgCTR = ctrs.reduce((a, b) => a + b, 0) / ctrs.length;
  const avgVisits = visits.reduce((a, b) => a + b, 0) / visits.length;

  const trend =
    avgRankChange > 0.5 ? "improving" :
    avgRankChange < -0.5 ? "declining" : "stable";

  const confidence = Math.min(1, Math.abs(avgRankChange) * 0.1 + avgCTR + avgVisits / 100);

  return {
    trend,
    avgRankChange: avgRankChange.toFixed(2),
    avgCTR: avgCTR.toFixed(3),
    avgVisits: Math.round(avgVisits),
    confidence: confidence.toFixed(2)
  };
}

/**
 * Predicts topic volatility based on engagement changes.
 * Returns indicators of intent shift or emerging opportunity.
 */
function detectVolatility(history = []) {
  if (history.length < 2) return { volatility: "unknown", signal: "n/a" };

  const last = history[history.length - 1];
  const prev = history[history.length - 2];

  const deltaCTR = last.ctr - prev.ctr;
  const deltaVisits = last.visits - prev.visits;

  if (deltaCTR < -0.05 && deltaVisits < -30) return { volatility: "falling", signal: "check for SERP shift" };
  if (deltaCTR > 0.05 && deltaVisits > 50) return { volatility: "surging", signal: "content refresh may win" };

  return { volatility: "stable", signal: "watch" };
}

module.exports = {
  calculateTrajectory,
  detectVolatility
};
