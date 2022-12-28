import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImages } from './api/getImages';
import { addImages } from './layout/addMarkup';

const galleryRef = document.querySelector('.gallery');
const searchFormRef = document.querySelector('.search-form');
const loadBtnRef = document.querySelector('.load-more');

let gallery = new SimpleLightbox('.gallery a');

let observer = new IntersectionObserver(getImagesByScroll, {
  root: null,
  rootMargin: '0px',
  threshold: 0.2,
});

let searchQuery = null;
let currentPage = 1;

async function getImagesByScroll(entries, observer) {
  if (entries[0].isIntersecting) {
    observer.unobserve(entries[0].target);
    await renderImages(galleryRef, searchQuery, ++currentPage);
  }
}

searchFormRef.addEventListener('submit', async e => {
  e.preventDefault();
  // loadBtnRef.classList.add('hidden');
  currentPage = 1;
  galleryRef.innerHTML = '';
  searchQuery = getInputData(e.currentTarget);
  if (searchQuery) {
    await renderImages(galleryRef, searchQuery, currentPage);
    // loadBtnRef.classList.remove('hidden');
    searchFormRef.reset();
  }
});

function getInputData(formRef) {
  const { searchQuery } = formRef.elements;
  const inputValue = searchQuery.value.trim();
  if (inputValue) {
    return inputValue;
  } else {
    Notiflix.Notify.failure("The search query can't be empty");
    return null;
  }
}

async function renderImages(galleryRef, searchQuery, currentPage) {
  try {
    const { hits, totalHits } = await getImages(searchQuery, currentPage);

    if (totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      addImages(hits, galleryRef);
      gallery.refresh();
      observer.observe(galleryRef.lastElementChild);

      if (currentPage === Math.ceil(totalHits / hits.length)) {
        observer.unobserve(galleryRef.lastElementChild);
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        // toggleLoadBtn(loadBtnRef);
      } else if (currentPage > 1) {
        Notiflix.Notify.info(
          `Hooray! We found ${currentPage * hits.length} images.`
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
}

// function scrollPageToElm(elementRef) {
//   const { height: cardHeight } =
//     elementRef.firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth',
//   });
// }

// function toggleLoadBtn(elementRef) {
//   elementRef.classList.toggle('hidden');
// }

// loadBtnRef.addEventListener('click', async e => {
//   e.target.disabled = true;
//   await renderImages(galleryRef, searchQuery, ++currentPage);

//   gallery.refresh();

//   scrollPageToElm(galleryRef);
//   e.target.disabled = false;
// });
