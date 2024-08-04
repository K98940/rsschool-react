'use client';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => {
  return (
    <section className="error-section">
      {error.name && <h1 className="error-title">{error.name}</h1>}
      {error.message && <p className="error-message">{error.message}</p>}
      <button className="button error-button" onClick={() => reset()}>
        Try again
      </button>
    </section>
  );
};

export default Error;
