import { Button } from "@/components/ui/button";

interface NavigationButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export function NavigationButton({ onClick, children }: NavigationButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="bg-[#00EE7D] hover:bg-[#00EE7D]/90 text-black"
    >
      {children}
    </Button>
  );
}
