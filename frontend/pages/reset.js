import RequestReset from '../components/RequestReset';
import ResetComponent from '../components/ResetComponent';

const ResetPwd = ({ query }) => {
  if (!query?.token) {
    return (
      <div>
        <p>Sorry you must supply a valid token.</p>
        <RequestReset />
      </div>
    );
  }

  return (
    <div>
      <ResetComponent token={query.token} />
    </div>
  );
};

export default ResetPwd;
