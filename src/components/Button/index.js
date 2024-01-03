import './style.scss';

const Button = ({ type, text, onClick }) => {
  return (
    <button className="blog__btn" type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
