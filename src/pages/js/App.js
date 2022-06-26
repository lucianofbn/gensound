import '../css/App.css';

function App() {
  return (
    <div className='Home'>
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
          <img className='btn-ud' src='/images/login/ud_default.png' onClick={() => window.location.href = '/gensound'} />
        </div>
      </div>
    </div>
  );
}

export default App;

