import Skeleton from "react-loading-skeleton";

export default function ProductReviewsLoading() {
  return (
    <div className="row">
      <div className="col-md-9">
        <Skeleton height={120} style={{ marginBottom: 15 }} />
        <Skeleton height={120} style={{ marginBottom: 15 }} />
        <Skeleton height={120} style={{ marginBottom: 15 }} />
      </div>

      <div className="col-md-3">
        <Skeleton height={20} style={{ marginBottom: 50 }} />

        <Skeleton height={30} style={{ marginBottom: 15 }} />
        <Skeleton height={30} style={{ marginBottom: 15 }} />
        <Skeleton height={30} style={{ marginBottom: 15 }} />
        <Skeleton height={30} style={{ marginBottom: 15 }} />
        <Skeleton height={30} style={{ marginBottom: 50 }} />

        <Skeleton height={40} style={{ marginBottom: 15 }} />
      </div>
    </div>
  );
}
