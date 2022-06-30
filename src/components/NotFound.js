import { Alert } from 'react-bootstrap';

const NotFound = () => (
    <div className="row">
    <Alert variant="info">{}</Alert>
    <div className="login-wrapper">
      <h2>Error 404: Entered URL is unavailable.</h2>
    </div>
  </div>
);

export default NotFound;