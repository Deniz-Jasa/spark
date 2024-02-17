// pages/_app.js
import '../app/globals.css'; // Import global styles

function MyApp({ Component, pageProps }) {
  // This component will wrap every page in your application
  return (
    <div>
      <Component {...pageProps} /> {/* Render the current page component */}
    </div>
  );
}

export default MyApp;
