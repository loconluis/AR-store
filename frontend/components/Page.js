import PropTypes from 'prop-types';
import Header from './Header';

const Page = ({ children }) => (
  <div>
    <Header />
    {children}
  </div>
);

export default Page;

Page.propTypes = {
  children: PropTypes.any,
};
