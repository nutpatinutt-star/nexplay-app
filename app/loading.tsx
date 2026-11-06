export default function Loading() {
  return (
    <main className="loading-shell" role="status" aria-label="กำลังโหลดเนื้อหา">
      <span className="sr-only">กำลังโหลด...</span>
      <div className="skeleton-block skeleton-hero" />
      <div className="skeleton-action-row">
        <div className="skeleton-block" />
        <div className="skeleton-block" />
      </div>
      <div className="skeleton-heading">
        <span className="skeleton-block" />
        <span className="skeleton-block" />
      </div>
      <div className="skeleton-scroll-row">
        <div className="skeleton-block" />
        <div className="skeleton-block" />
      </div>
      <div className="skeleton-heading">
        <span className="skeleton-block" />
      </div>
      <div className="skeleton-menu-row">
        <div className="skeleton-block" />
        <div className="skeleton-block" />
        <div className="skeleton-block" />
        <div className="skeleton-block" />
      </div>
    </main>
  );
}
