"use client";
interface IHeaderProps {
  title: string;
  subtitle?: string;
  button?: React.ReactNode;
}

const Header: React.FC<IHeaderProps> = ({ title, subtitle, button }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h1 className="text-xl md:text-3xl font-bold">{title}</h1>
        {subtitle && (
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            {subtitle}
          </p>
        )}
      </div>
      {button && <>{button}</>}
    </div>
  );
};

export default Header;
