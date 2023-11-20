'use client';

import { i18nConfig } from '@/i18n';
import redirectPathname from '@/lib/i18n/redirectPathname';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface Props {
  message: string;
}

export default function LocaleSelector({ message }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const localeInfo = {
    en: {
      native: 'English',
      english: 'English',
    },
    fi: { native: 'Suomi', english: 'Finnish' },
  };

  return (
    <>
      <button
        className={`flex h-12 w-12 items-center justify-center rounded-lg hover:bg-neutral-100 ${
          isOpen ? 'bg-neutral-100' : ''
        } `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <GlobeIcon />
      </button>

      {isOpen && (
        <div className="absolute translate-y-28 ">
          <div className='className="flex py-1" w-48 flex-col rounded-md border border-neutral-200 bg-white'>
            <div className="px-3 py-2">
              <h1 className="text-md font-medium">{message}</h1>
            </div>
            <ul className="flex w-full flex-col divide-y divide-neutral-200">
              {i18nConfig.locales.map((locale, index) => {
                return (
                  <Link key={index} href={redirectPathname(locale, pathname)}>
                    <li className="flex w-full flex-col items-start justify-center px-3 py-1 hover:bg-neutral-100">
                      <h2 className="text-md font-medium text-neutral-950">
                        {localeInfo[locale].native}
                      </h2>
                      <p className="text-xs text-neutral-600">
                        {localeInfo[locale].english}
                      </p>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

function GlobeIcon() {
  return (
    <>
      {/* Globe SVG icon, sourced from: https://heroicons.com/ */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={'1.5'}
        stroke="currentColor"
        className="h-8 w-8 stroke-neutral-900"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
        />
      </svg>
    </>
  );
}
