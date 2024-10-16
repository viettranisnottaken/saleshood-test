import Navbar from "../../components/navbar/Navbar";
import './main-layout.scss';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <div>
    <Navbar></Navbar>
    <div className="container">
      { children }
    </div>
  </div>;
}