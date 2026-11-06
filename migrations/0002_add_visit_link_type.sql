-- Adds a 'visit' link_type: one row per landing-page load, fired once per browser session (see
-- AppFrame.tsx), independent of whether that visitor goes on to click Register or Add LINE. This is
-- the number that's actually comparable to Meta Ads Manager's own "Link Clicks" metric — the
-- register/line rows only ever counted on-page button clicks, not arrivals from the ad link itself.
--
-- SQLite can't ALTER a CHECK constraint in place, so rebuild the table (D1 runs this as one batch).
CREATE TABLE link_clicks_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  streamer_slug TEXT NOT NULL,
  link_type TEXT NOT NULL CHECK (link_type IN ('visit', 'register', 'line')),
  clicked_at TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT INTO link_clicks_new (id, streamer_slug, link_type, clicked_at)
  SELECT id, streamer_slug, link_type, clicked_at FROM link_clicks;

DROP TABLE link_clicks;
ALTER TABLE link_clicks_new RENAME TO link_clicks;

CREATE INDEX idx_link_clicks_streamer_time ON link_clicks (streamer_slug, clicked_at);
CREATE INDEX idx_link_clicks_type_time ON link_clicks (link_type, clicked_at);
