import Link from 'next/link';

import { DISCORD_LINK, RYAN_LINKEDIN_LINK, RYAN_TWITTER_LINK, TWITTER_LINK } from '../../data/consts';

export function FooterColumn({ children }) {
  return <div className="my-4 w-full md:w-auto">{children}</div>;
}

export function FooterRow({ children }) {
  return <div className="flex">{children}</div>;
}

export function FooterHeading({ children }) {
  return <h3 className="text-xl mb-3">{children}</h3>;
}

export function FooterSubHeading({ children }) {
  return <h4 className="text-lg my-2">{children}</h4>;
}

export function FooterLink({ link, text }) {
  return (
    <div className="my-1 text-base font-light">
      <Link href={link}>
        <a className="inline-block hover:text-theme">{text}</a>
      </Link>
    </div>
  );
}

export function FooterDiscordLink() {
  return (
    <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
      <svg
        className="fill-secondary hover:fill-theme mr-2"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fillRule="evenodd"
        clipRule="evenodd"
      >
        <path d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22h-13.608c-1.356 0-2.46-1.104-2.46-2.472v-16.224c0-1.368 1.104-2.472 2.46-2.472h16.08zm-4.632 15.672c2.652-.084 3.672-1.824 3.672-1.824 0-3.864-1.728-6.996-1.728-6.996-1.728-1.296-3.372-1.26-3.372-1.26l-.168.192c2.04.624 2.988 1.524 2.988 1.524-1.248-.684-2.472-1.02-3.612-1.152-.864-.096-1.692-.072-2.424.024l-.204.024c-.42.036-1.44.192-2.724.756-.444.204-.708.348-.708.348s.996-.948 3.156-1.572l-.12-.144s-1.644-.036-3.372 1.26c0 0-1.728 3.132-1.728 6.996 0 0 1.008 1.74 3.66 1.824 0 0 .444-.54.804-.996-1.524-.456-2.1-1.416-2.1-1.416l.336.204.048.036.047.027.014.006.047.027c.3.168.6.3.876.408.492.192 1.08.384 1.764.516.9.168 1.956.228 3.108.012.564-.096 1.14-.264 1.74-.516.42-.156.888-.384 1.38-.708 0 0-.6.984-2.172 1.428.36.456.792.972.792.972zm-5.58-5.604c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332.012-.732-.54-1.332-1.224-1.332zm4.38 0c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332 0-.732-.54-1.332-1.224-1.332z" />
      </svg>
    </a>
  );
}

export function FooterLinkedInLink() {
  return (
    <a href={RYAN_LINKEDIN_LINK} target="_blank" rel="noopener noreferrer">
      <svg
        className="fill-secondary hover:fill-theme mr-2"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
      </svg>
    </a>
  );
}

export function FooterTwitterLink({ isPersonal }) {
  return (
    <a href={isPersonal ? RYAN_TWITTER_LINK : TWITTER_LINK} target="_blank" rel="noopener noreferrer">
      <svg
        className="fill-secondary hover:fill-theme mr-2"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
      </svg>
    </a>
  );
}

export function FooterCopyright() {
  return (
    <p className="text-center lg:text-left text-sm font-light w-full lg:w-auto">
      {`Copyright © ${new Date().getFullYear()} Ryan Gregory. All Rights Reserved. Design inspirations from the talented `}
      <a className="hover:text-theme" href="https://sld.codes" target="_blank" rel="noopener noreferrer">
        Sam Larsen-Disney
      </a>
      .
    </p>
  );
}
