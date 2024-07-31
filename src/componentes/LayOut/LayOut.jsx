import Header from "../Header/Header";
import LowerHeader from "../Header/LowerHeader";

// ... existing code ...LowerHeader";

// eslint-disable-next-line react/prop-types
function LayOut({ children }) {
  return (
    <>
      <Header />
      <LowerHeader />
      {children}
    </>
  );
}

export default LayOut;
