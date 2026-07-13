import { KairosLogo } from "@/components/kairos-logo";

export default function TestLogos() {
  return (
    <div style={{ padding: "50px", backgroundColor: "#333", height: "100vh" }}>
      <h1 style={{ color: "white" }}>New SVG Logo Test</h1>
      <div style={{ border: "1px solid red", width: "400px", padding: "20px", margin: "20px 0" }}>
        <KairosLogo inverted />
      </div>
      <div style={{ border: "1px solid red", width: "600px", padding: "20px", margin: "20px 0" }}>
        <KairosLogo inverted />
      </div>
    </div>
  );
}
