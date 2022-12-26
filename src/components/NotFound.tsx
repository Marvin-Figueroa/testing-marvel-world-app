import './NotFound.scss';

export default function NotFound() {
  return (
    <div id='error-page'>
      <h1 className='error-page__title'>Oops!</h1>
      <p className='error-page__message'>
        The page you were looking for does not exists!
      </p>
    </div>
  );
}
