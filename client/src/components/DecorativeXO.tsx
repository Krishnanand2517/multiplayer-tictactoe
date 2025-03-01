import { DecorationType } from "../types";

const DecorativeXO = ({
  decorationType,
}: {
  decorationType: DecorationType;
}) => {
  return (
    <>
      {decorationType === "page" ? (
        <>
          <div className="absolute -rotate-12 text-6xl font-bold text-amber-200/30 left-6 top-20 select-none">
            X
          </div>
          <div className="absolute rotate-12 text-6xl font-bold text-amber-200/30 right-8 top-32 select-none">
            O
          </div>
          <div className="absolute -rotate-6 text-6xl font-bold text-amber-200/30 left-10 bottom-20 select-none">
            O
          </div>
          <div className="absolute rotate-6 text-6xl font-bold text-amber-200/30 right-8 bottom-40 select-none">
            X
          </div>
        </>
      ) : (
        <>
          <div className="absolute -rotate-12 text-4xl font-bold text-amber-200 -left-4 top-20 select-none">
            X
          </div>
          <div className="absolute rotate-12 text-4xl font-bold text-amber-200 -right-4 top-32 select-none">
            O
          </div>
          <div className="absolute -rotate-6 text-4xl font-bold text-amber-200 left-4 bottom-6 select-none">
            O
          </div>
          <div className="absolute rotate-6 text-4xl font-bold text-amber-200 right-6 bottom-8 select-none">
            X
          </div>
        </>
      )}
    </>
  );
};

export default DecorativeXO;
