import React from 'react';

export class ErrorBoundary extends React.Component{
  constructor(props) {
    super(props);
    this.state = {hasError: false, errorTxt: ''};
  }

  static getDerivedStateFromError(error) {
    return {hasError: true, errorTxt: error};
  }

  render() {
    if (this.state.hasError) {
      return <p>{this.state.errorTxt.toString()}</p>;
    }

    return this.props.children;
  }
}