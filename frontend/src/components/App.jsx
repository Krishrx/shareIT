
import ContentBoxes from "./ContentBoxes";
import Header from "./Header";
import InputBoxes from "./InputBoxes";

function App() {
  const isDark = false;
  return (
    <div className={`font-poppins w-full min-h-screen max-h-full ${isDark?'bg-darkBackground text-darkText':'bg-background text-text'}`}>
      <Header />
      <InputBoxes />
      <ContentBoxes/>
    </div>
  )
}

export default App
