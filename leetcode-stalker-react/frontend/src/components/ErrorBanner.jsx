export default function ErrorBanner({ message }) {
  if (!message) return null; // don't display if no message
  console.log(message)
  return (
    <div style={{
      width: "100%",
      padding: "12px 20px",
      background: "#fee2e2",
      border: "1px solid #fca5a5",
      color: "#991b1b",
      fontWeight: "500",
      borderRadius: "8px",
      marginBottom: "16px",
      textAlign: "center"
    }}>
      {message}
    </div>
  );
}
