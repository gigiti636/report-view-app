import ErrorIllustration from '@/assets/illustrations/illustration_404.svg';

export const NotFound = () => (
  <div style={{ textAlign: 'center', padding: '2rem' }}>
    <h1>404 - Page Not Found</h1>
    <img src={ErrorIllustration} alt="404 Illustration" style={{ maxWidth: '100%' }} />
    <p>The page you are looking for does not exist.</p>
  </div>
);
