import React from 'react';
import BaseLayout from '@components/layout/BaseLayout';

export default function HomePage() {
  return (
    <BaseLayout>
      <div className="mt-48 lg:mt-64 text-center text-white">
        <h2 className="text-6xl md:text-8xl mb-8">Hi, I'm Iain</h2>
        <h4 className="text-2xl">A Software Engineer with a DevOps background</h4>
      </div>
    </BaseLayout>
  );
}
