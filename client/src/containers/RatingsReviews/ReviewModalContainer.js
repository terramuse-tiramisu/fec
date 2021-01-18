import { connect } from 'react-redux';
import ReviewModal from '../../components/RatingsReviews/ReviewModal.jsx';

const mapStateToProps = (state) => ({
  reviewModal: state.reviewModal,
  reviewRating: state.reviewRating,
  reviewSummary: state.reviewSummary,
  reviewBody: state.reviewBody,
  reviewPhotos: state.reviewPhotos,
  reviewRecommendation: state.reviewRecommendation,
  reviewUser: state.reviewUser,
  reviewEmail: state.reviewEmail,
  reviewWordCount: state.reviewWordCount
});

// const mapDispatchToProps = (dispatch) => {
//   return {

//   };
// };

const ReviewModalContainer = connect(mapStateToProps)(ReviewModal);