import LazyImg from '../LazyImg/LazyImg';
import { Content } from '../../types';
import './ContentCard.css';

interface ContentCardProp {
  content: Content
}

function ContentCard(props: ContentCardProp) {
  const { content } = props;
  return (
    <div className="content-card">
      <LazyImg src={content['poster-image']} alt={content.name} />
      <p className="text-truncate mt-2 mb-0">{ content.name }</p>
    </div>
  )
}

export default ContentCard