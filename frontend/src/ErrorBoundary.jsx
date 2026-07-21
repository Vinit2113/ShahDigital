import { Component } from "react";

// Catches unhandled render errors anywhere below it in the tree and shows a
// recoverable screen instead of the whole page going blank for a visitor.
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Unhandled render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50 px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Something went wrong
          </h1>
          <p className="text-gray-500 max-w-md">
            Please refresh the page. If the problem continues, try again in a
            few minutes.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 text-sm font-medium text-white bg-[#0a54ff] rounded-lg hover:bg-blue-800 transition-all duration-200"
          >
            Refresh
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
