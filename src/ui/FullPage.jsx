function FullPage({ children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas">
      {children}
    </div>
  );
}

export default FullPage;
