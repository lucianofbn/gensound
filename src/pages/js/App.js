import { uauth_recover } from '../../model/login/connector';
import LoginWidget from '../../model/login/LoginWidget';
import '../css/App.css';

function App() {
  return (
    <div className='Home'>
      {isLoggedIn()}
      <div className='container'>
        <div className='sub-container'>
          <div className='logo'>
            <img src='/images/logo.png' />
            <p>Gen<span>Sound</span></p>
          </div>
          <p className='description'>
            Discover new music from your favorite <br />genres and add it to your playlist!</p>
        </div>
        <hr className='divider' />
        <div className='sub-container'>
          <p className='login-label'>Login to Continue.</p>
          <LoginWidget></LoginWidget>
        </div>
      </div>
    </div>
  );
}

function isLoggedIn() {
  uauth_recover.uauth.user().then((user) => {
    window.location.href = "/gensound"
  }).catch(() => {
    return false;
  });
  return false;
}

export default App;

