import { Metadata } from "next";
import TeamClient from "./team-client";

export const metadata: Metadata = {
  title: "Our Team | Kavach X",
  description: "Meet the passionate engineers, designers, and safety advocates building India's most intelligent personal safety platform.",
  openGraph: {
    title: "Our Team | Kavach X",
    description: "Meet the passionate engineers, designers, and safety advocates building India's most intelligent personal safety platform.",
    url: "/team",
  },
};

export default function TeamPage() {
  return <TeamClient />;
}
