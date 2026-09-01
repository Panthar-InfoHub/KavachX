import { Metadata } from "next";
import TeamClient from "./team-client";

export const metadata: Metadata = {
  title: "Our Team | KavachX",
  description: "Meet the passionate engineers, designers, and safety advocates building KavachX's enterprise safety infrastructure and the KAIROS AI edge box.",
  openGraph: {
    title: "Our Team | KavachX",
    description: "Meet the passionate engineers, designers, and safety advocates building KavachX's enterprise safety infrastructure and the KAIROS AI edge box.",
    url: "https://kavachx.io/team",
  },
};

export default function TeamPage() {
  return <TeamClient />;
}
