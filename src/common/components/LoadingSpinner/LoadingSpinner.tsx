import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner" role="status" aria-live="polite">
      <div className="loading-spinner__disc">
        <span className="loading-spinner__ring" />
        <span className="loading-spinner__pulse" />
      </div>
      <p className="loading-spinner__text">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
