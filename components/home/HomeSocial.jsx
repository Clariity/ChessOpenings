import { HomeCardSmall } from './HomeCard';

export function HomeSocial() {
  return (
    <HomeCardSmall>
      <div className="text-center">
        <h2 className="text-lg sm:text-xl md:text-3xl mb-4">Join The Discord Server</h2>
        <p className="mb-4">
          Provide feedback, ask questions, talk to other site users, get early insight into new features and more, all
          on the ChessOpenings.co.uk Discord server. Click the Discord logo below to join!
        </p>
        <a
          className="flex flex-col items-center"
          href="https://discord.gg/xKYtamwV8p"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="mb-4 w-24" src="/media/images/discord.png" alt="Discord" />
          ChessOpenings Discord Server
        </a>
      </div>
    </HomeCardSmall>
  );
}
