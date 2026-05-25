function Button({ text }) {
  return (
    <button className="bg-white text-black px-6 py-3 rounded-lg font-bold hover:scale-105 transition">
      {text}
    </button>
  );
}

export default Button;