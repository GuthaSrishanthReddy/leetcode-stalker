import Silk from "./Silk";

export default function Home() {
  return (
    <div>
      

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
