import React from "react";

const StatsCard = ({
  number,
  text,
  lucideIcon,
}: {
  number: string | number;
  text: string;
  lucideIcon: React.ReactNode;
}) => {
  return (
    <div className="flex w-[210px] items-center justify-start rounded-2xl border-2 border-primary/20 bg-white p-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-primary/40 bg-primary/10 text-background">
        {lucideIcon}
      </div>
      <div className="ml-3 flex flex-col items-start justify-start">
        <span className="text-2xl font-bold text-primary">{number}</span>
        <span className="text-nowrap text-sm text-muted-foreground">
          {text}
        </span>
      </div>
    </div>
  );
};

export default StatsCard;
