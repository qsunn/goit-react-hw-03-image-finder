import 'react-toastify/dist/ReactToastify.css';

import { PureComponent } from 'react';
import { ToastContainer } from 'react-toastify';

import { getData } from './services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { NothingFound } from './NothingFound/NothingFound';

export class App extends PureComponent {
  state = {
    images: [],
    page: 1,
    search: '',
    showButton: false,
    showLoader: false,
    modalImageUrl: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, search } = this.state;

    if (page !== 1 && prevState.page !== page) {
      getData(search, page).then(data => {
        this.setState({ images: [...prevState.images, ...data.hits] });
        page >= data.pages && this.toggleButton();
      });
    }

    if (prevState.search !== search) {
      this.reset();
      this.toggleLoader();
      getData(search)
        .then(data => {
          this.setState({ images: data.hits });
          page < data.pages && this.toggleButton();
        })
        .finally(this.toggleLoader);
    }
  }

  onSubmit = search => this.setState({ search: search });

  loadMoreHandler = () => this.setState({ page: this.state.page + 1 });

  toggleButton = () => this.setState({ showButton: !this.state.showButton });

  toggleLoader = () => this.setState({ showLoader: !this.state.showLoader });

  toggleModal = (url = '') => this.setState({ modalImageUrl: url });

  reset = () => this.setState({ page: 1, showButton: false });

  render() {
    const { images, search, showButton, showLoader, modalImageUrl } =
      this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />

        {images.length > 0 && !showLoader && (
          <ImageGallery images={images} toggleModal={this.toggleModal} />
        )}

        {images.length === 0 && search.length !== 0 && !showLoader && (
          <NothingFound />
        )}

        {showButton && <Button loadMoreHandler={this.loadMoreHandler} />}

        {showLoader && <Loader />}

        {modalImageUrl && (
          <Modal toggleModal={this.toggleModal}>
            <img src={modalImageUrl} alt={search} />
          </Modal>
        )}

        <ToastContainer position="bottom-center" autoClose={2000} />
      </div>
    );
  }
}
