import React from 'react';

interface IProps {
    query:any;
    id:string;
  }

export default class extends React.Component<IProps> {
  static getInitialProps ({ query: { id } }) {
    return { id };
  }

  render () {
    return ( <div>
      <h1>My Fiction {this.props.id} blog post</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div> );
  }
}
