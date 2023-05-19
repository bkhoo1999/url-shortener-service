import { HyperlinkComponentClass } from "./hyperlink-component-classname";

const HyperlinkComponent = (props: HyperlinkComponentProps) => {
  const { link, label, onClick } = props;
  const { HYPERLINK } = HyperlinkComponentClass;

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className={HYPERLINK}
      onClick={onClick}
    >
      {label || link}
    </a>
  );
};

interface HyperlinkComponentProps {
  link: string;
  label?: string;
  onClick?: () => void;
}

export default HyperlinkComponent;
