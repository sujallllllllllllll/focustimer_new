interface StructuredDataProps {
  type: 'WebApplication' | 'BreadcrumbList';
  page: string;
}

export function StructuredData({ type, page }: StructuredDataProps) {
  if (type === 'WebApplication') {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'TimeMaster',
      description: 'Free collection of productivity timers: Pomodoro, 50/10, 60/10, 90/20, Flowtime, and more.',
      url: 'https://timemaster.app',
      applicationCategory: 'ProductivityApplication',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Pomodoro Timer',
        'Custom Timers',
        'Desktop Notifications',
        'Offline Support',
        'No Registration Required',
      ],
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    );
  }

  if (type === 'BreadcrumbList') {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://timemaster.app',
        },
      ],
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    );
  }

  return null;
}