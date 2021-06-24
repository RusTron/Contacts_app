import { compose } from 'redux';
import { connect } from 'react-redux';
// import { useParams } from 'react-router-dom';
import { View } from './view';

const mapStateToProps = () => {
  return {};
};

export const NavBar = compose(connect(mapStateToProps, null))(View);
