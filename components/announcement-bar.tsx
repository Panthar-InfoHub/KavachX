import React from "react";

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-white text-black font-syne py-4 px-4 text-center text-sm font-medium z-60 relative">
      <p>
        Loved by tons of people for keeping their families safe and connected.{" "}
        <a href="#" className="underline font-bold hover:text-black/70 transition-colors">
          Try it out for free!
        </a>
      </p>
    </div>
  );
};
