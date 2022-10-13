import s from './ImageGallery.module.css';

import { Component } from 'react';
import { PropTypes } from 'prop-types';

import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  render() {
    const { images, toggleModal } = this.props;
    return (
      <ul className={s.ImageGallery}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            src={image.webformatURL}
            toggleModal={() => toggleModal(image.largeImageURL)}
          />
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
    })
  ).isRequired,
  toggleModal: PropTypes.func.isRequired,
};
