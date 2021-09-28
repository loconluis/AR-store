import styled from 'styled-components';
import SigInComponent from '../components/SignIn';
import SignUpComponent from '../components/SignUp';
import RequestReset from '../components/RequestReset';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
`;

const SigIn = () => (
  <Grid>
    <SigInComponent />
    <SignUpComponent />
    <RequestReset />
  </Grid>
);

export default SigIn;
