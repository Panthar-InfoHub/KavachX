
interface Link {
  text: string;
  href: string;
}

interface CTAButton extends Link{
  variant: "primary" | "secondary";
}

interface DropdownColumn {
  heading: string;
  links: Link[];
}

type DropdownData = DropdownColumn[];

interface MenuItem {
  label: string;
  href?: string;
  dropdown?: DropdownData;
}

export interface NavbarConfig {
  logo: React.ReactNode;
  cta: {
    one?: CTAButton;
    two?: CTAButton;
  };
  menu: MenuItem[];
}
