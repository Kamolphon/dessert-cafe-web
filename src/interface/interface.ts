export type MenuOptionChoice = {
    label: string;
  };
  
export type MenuOption = {
    label: string;
    choices: MenuOptionChoice[];
  };
  
export type MenuItem = {
    name: string;
    id: string;
    fullPrice: number;
    categories: string;
    discountedPercent: number;
    discountedTimePeriod: {
      begin: string;
      end: string;
    };
    sold: number;
    totalInStock: number;
    largeImage: string;
    options: MenuOption[];
  };
  
export type Restaurant = {
    restaurantId: number;
    restaurantName: string;
    coverImage: string;
    activeTimePeriod: {
        open: string;
        close: string;
      }
    menus: MenuItem[];
  };
  