// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const fetchPicturesForm = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const userInput = document.querySelector('input');
const loader = document.querySelector('.loader');

fetchPicturesForm.addEventListener('submit', e => {
  e.preventDefault();

  const apiKey = '22866492-0a616de8c4fefaa29c0c168ad';
  const searchTerm = userInput.value.trim();

  if (!searchTerm) {
    iziToast.warning({
      title: '',
      backgroundColor: '#FFA07A',
      message: 'Please enter a search term!',
    });
    return;
  }

  gallery.innerHTML = '';

  showLoader();

  fetch(
    `https://pixabay.com/api/?key=${apiKey}&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          title: '',
          backgroundColor: '#EF4040',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
        const galleryMarkup = data.hits
          .map(image => {
            return `<li class="gallery-item">
                        <a href="${image.largeImageURL}">
                          <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}">
                        </a>
                        <p><b>Likes: </b>${image.likes}</p>
                        <p><b>Views: </b>${image.views}</p>
                        <p><b>Comments: </b>${image.comments}</p>
                        <p><b>Downloads: </b>${image.downloads}</p>
                      </li>`;
          })
          .join('');

        gallery.innerHTML = galleryMarkup;

        const lightbox = new SimpleLightbox('.gallery a', {
          captions: true,
          captionSelector: 'img',
          captionType: 'attr',
          captionsData: 'alt',
          captionPosition: 'bottom',
          animation: 250,
        });

        lightbox.on('show.simplelightbox');
        lightbox.refresh();
        fetchPicturesForm.reset();
      }
    })
    .catch(error => {
      console.error('Error fetching images:', error);
    })
    .finally(() => {
      hideLoader();
    });
});

const showLoader = () => {
  loader.style.display = 'block';
};

const hideLoader = () => {
  loader.style.display = 'none';
};
