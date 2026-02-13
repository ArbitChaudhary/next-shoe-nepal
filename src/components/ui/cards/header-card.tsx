import { CardHeader, CardTitle } from "../card";

interface HeaderCardProps {
  title: string;
  subtitle?: string;
}

const HeaderCard: React.FC<HeaderCardProps> = ({ title, subtitle }) => {
  return (
    <CardHeader>
      <CardTitle>
        <span className="font-display text-lg md:text-xl tracking-wide">
          {title}
        </span>
        {subtitle && (
          <span className="text-sm text-muted-foreground block mt-1">
            {subtitle}
          </span>
        )}
      </CardTitle>
    </CardHeader>
  );
};

export default HeaderCard;
