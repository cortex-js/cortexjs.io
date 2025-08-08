import OriginalFooter from '@theme-original/Footer';
import '../../shared/components/Footer.css';

export default function Footer(props) {
  return (
    <div className="shared-footer">
      <OriginalFooter {...props} />
    </div>
  );
}