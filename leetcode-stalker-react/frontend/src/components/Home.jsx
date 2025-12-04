import Silk from "./Silk";

export default function Home() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Silk Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
        }}
      >
        <Silk
          speed={5}
          scale={1}
          color="#7B7481"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      {/* Page Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          paddingTop: "120px",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
          Welcome to LeetCode Stalker
        </h1>
        <p style={{ fontSize: "1.2rem", opacity: 0.9 }}>
          Track and manage your LeetCode profiles easily.
        </p>
      </div>
    </div>
  );
}
