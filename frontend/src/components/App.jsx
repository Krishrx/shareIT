
import ContentBoxes from "./ContentBoxes";
import Header from "./Header";
import InputBoxes from "./InputBoxes";
import Footer from "./Footer";

function App() {
  const isDark = false;
  return (
    <div className={`font-poppins w-full min-h-screen max-h-full ${isDark?'bg-darkBackground text-darkText':'bg-background text-text'}`}>
      <Header />
      <InputBoxes />
      <ContentBoxes />
      <Footer/>
    </div>
  )
}

export default App
