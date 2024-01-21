'use client';

import { i18nConfig } from '@/i18n';
import redirectToLocale from '@/lib/i18n/redirectToLocale';
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
                  <Link key={index} href={redirectToLocale(locale, pathname)}>
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
      {/* Trabslation SVG icon, sourced from: https://heroicons.com/ */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
        />
      </svg>
    </>
  );
}
