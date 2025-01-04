import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <Button size="lg" onClick={() => navigate("/admin")} className="text-lg">
        Go to Admin Panel
      </Button>
    </div>
  );
}

export default Home;
