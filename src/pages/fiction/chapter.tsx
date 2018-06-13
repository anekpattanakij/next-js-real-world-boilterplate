import React from 'react';

interface IProps {
    query:any;
    fiction:string;
    chapter:string;
  }

export default class extends React.Component<IProps> {
  static getInitialProps ({ query: { fiction,chapter } }) {
    return { fiction,chapter };
  }

  render () {
    return ( <div>
      <h1>This is content for fiction  {this.props.fiction} and chapter {this.props.chapter}</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div> );
  }
}
