import React from "react";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// class ErrorBoundary extends React.Component {
//   state = { hasError: false };

//   static getDerivedStateFromError(error) {
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     console.log({ error, errorInfo });
//   }

//   triggerError = ({ error, errorInfo }) => {
//     console.log({ error, errorInfo });
//     this.setState({ hasError: true });
//   };

//   resetError = () => {
//     this.setState({ hasError: false });
//   };

//   render() {
//     return (
//       <ErrorBoundaryContext.Provider value={this.triggerError}>
//         {this.state.hasError ? (
//           <h1>Oops, we done goofed up</h1>
//         ) : (
//           this.props.children
//         )}
//       </ErrorBoundaryContext.Provider>
//     );
//   }
// }

export default ErrorBoundary;
