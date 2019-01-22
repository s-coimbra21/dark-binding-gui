import React, { PureComponent, HTMLAttributes } from 'react';

import { request } from '@utils/lcu-request';

interface ImageProps extends HTMLAttributes<HTMLImageElement> {
  src: string;
}

interface ImageState {
  image: string;
}

export class Image extends PureComponent<ImageProps, ImageState> {
  state = {
    image: '',
  };

  // getImage = () => {
  //   request(
  //     this.props.src,
  //     { json: false, encoding: 'binary' },
  //     undefined,
  //     (err, req, body) => {
  //       if (err) return; // do some shit to retry

  //       const mime = req.headers['content-type']!;
  //       const base64 = new Buffer(body, 'binary').toString('base64');
  //       const dataURI = 'data:' + mime + ';base64,' + base64;

  //       this.setState({ image: dataURI });
  //     }
  //   );
  // };

  // componentDidMount() {
  //   this.getImage();
  // }

  // componentDidUpdate(prevProps: ImageProps) {
  //   if (this.props.src !== prevProps.src) this.getImage();
  // }

  render() {
    const { src, style, children, ...rest } = this.props;

    return (
      <img
        {...rest}
        src={`https://127.0.0.1:${global.credentials!.port}${src}`}
      />
    );
  }
}
