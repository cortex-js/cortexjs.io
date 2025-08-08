import OriginalNavbar from '@theme-original/Navbar';
import '../../shared/components/Header.css';

export default function Navbar(props) {
  return (
    <div className="shared-header">
      <OriginalNavbar {...props} />
    </div>
  );
}