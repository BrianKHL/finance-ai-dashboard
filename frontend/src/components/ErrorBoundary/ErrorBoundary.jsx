import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      message: error instanceof Error ? error.message : "Unknown render error",
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Render error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "16px", background: "#fff3f3", borderRadius: "8px", color: "#b00020" }}>
          <strong>Component failed to render.</strong>
          <p style={{ marginTop: "8px" }}>{this.state.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
