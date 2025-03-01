const HeadText = () => {
  return (
    <h1
      className="text-3xl font-bold text-center mb-6 text-amber-900"
      style={{
        textShadow:
          "2px 2px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
        transform: "rotate(-2deg)",
      }}
    >
      Tic-Tac-Toe
    </h1>
  );
};

export default HeadText;
