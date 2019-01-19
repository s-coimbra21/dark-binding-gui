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

  getImage = () => {
    request(
      this.props.src,
      { json: false, encoding: 'binary' },
      undefined,
      (err, req, body) => {
        if (err) return; // do some shit to retry

        const mime = req.headers['content-type']!;
        const base64 = new Buffer(body, 'binary').toString('base64');
        const dataURI = 'data:' + mime + ';base64,' + base64;

        this.setState({ image: dataURI });
      }
    );
  };

  render() {
    const { style, children, ...rest } = this.props;
    const { image } = this.state;

    return (
      <div style={Object.assign({ backgroundImage: image }, style)} {...rest}>
        {children}
      </div>
    );
  }
}
