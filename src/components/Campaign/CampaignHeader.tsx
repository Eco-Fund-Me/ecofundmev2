interface CampaignHeaderProps {
  category: string;
  title: string;
  subtitle: string;
}

export function CampaignHeader({
  category,
  title,
  subtitle,
}: CampaignHeaderProps) {
  return (
    <div className="space-y-3">
      <p className="text-[#00EE7D] text-sm">{category}</p>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-gray-600">{subtitle}</p>
    </div>
  );
}
