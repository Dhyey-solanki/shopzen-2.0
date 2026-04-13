function Loader({ message = "Loading..." }) {
  return (
    <div className="section-group">
      <div className="auth-card">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Loader;
