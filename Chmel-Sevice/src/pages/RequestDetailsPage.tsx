import React from 'react';
import { Header } from '../widgets/Header';
import { RequestDetailsWidget } from '../widgets/RequestDetailsWidget';

const RequestDetailsPage: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-dark)' }}>
      <Header />
      <main style={{ flex: 1, maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '32px 24px' }}>
        <RequestDetailsWidget />
      </main>
    </div>
  );
};

export default RequestDetailsPage;
