import {FadeLoader } from 'react-spinners';

function Loader() {
  return (
    <div style={{ height: "50vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <FadeLoader />
    </div>
  );
}

export default Loader