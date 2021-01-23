import searchEngine from '../../lib/searchEngine.js';
import relatedItemList from './relatedItemList.js';
import relatedItemsListDetail from './relatedItemsListDetail.js';
import relatedItemCarouselList from './relatedItemCarouselList.js';
import totalCarouselList from './totalCarouselList.js';

import { calculateProductAvgRating, calculateProductAvgStarRating } from '../RatingsReviews/setRatings.js';

const addTimeSaver = ( notSavedItemList ) => {
  console.log('!!! i am using it?????????? !!!', notSavedItemList );

  return (dispatch) => {

    let list = [];
    let carouselList = notSavedItemList.map( itemId =>{

      return searchEngine.get(`products/${itemId}`)
        .then(res => {
          list.push( res.data );
        })
        .catch(err => console.log('adding related items list of id failed :', err));
    });
    return Promise.all(carouselList)
      .then(()=>{
        return dispatch( relatedItemsListDetail( list ) );
      })

      .then(res=>{
        let list = [];
        let carouselDetailList = res.relatedItemsListDetail.map( item =>{
          let overall = item;
          return searchEngine.get(`products/${item.id}/styles`)
            .then(res => {
              var productId = item.id;
              overall.styles = res.data.results;

              searchEngine.get('reviews/meta', { product_id: productId })
                .then(({ data }) => {
                  const productAvgRating = calculateProductAvgRating(data.ratings);
                  const starRating = calculateProductAvgStarRating(productAvgRating);
                  overall.avgStarRating = starRating;
                })
                .catch(err=>console.log('adding starRating to related items list  failed :', err));

              list.push( overall );
            })
            .catch(err => console.log('adding style to related items list  failed :', err));
        });

        Promise.all(carouselDetailList)
          .then(()=>{
            dispatch( totalCarouselList(list) );
          });

      })
      .catch(err=>console.log('adding related carouselList failed :', err));
  };
};

export default addTimeSaver;