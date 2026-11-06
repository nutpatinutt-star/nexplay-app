-- Link-click tracking, independent of GA4 (which isn't configured for every
-- streamer yet) and of Meta Ads Manager's own numbers, which the user has
-- found don't match reality for livestream ad traffic. One row per click on
-- the register or "add LINE" link, with the streamer and link type, so any
-- time window (e.g. a specific live session) can be counted after the fact.
CREATE TABLE link_clicks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  streamer_slug TEXT NOT NULL,
  link_type TEXT NOT NULL CHECK (link_type IN ('register', 'line')),
  clicked_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_link_clicks_streamer_time ON link_clicks (streamer_slug, clicked_at);
CREATE INDEX idx_link_clicks_type_time ON link_clicks (link_type, clicked_at);
