import ContentBoxes from "../components/ContentBoxes";
import InputBoxes from "../components/InputBoxes";

function Home() {
  return (
    <div className={`w-full min-h-screen max-h-full`}>
        <InputBoxes />
        <ContentBoxes />
    </div>
  )
}

export default Home