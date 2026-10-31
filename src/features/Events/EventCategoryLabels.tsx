import { EventCategory } from "@prisma/client";


export const eventCategoryLabels: Record<
  EventCategory,
  string
> = {
  FAMILY_KIDS: "Family & Kids",
  MUSIC_NIGHTLIFE: "Music & Nightlife",
  MARKETS_SHOPPING: "Markets & Shopping",
  FOOD_DRINK: "Food & Drink",
  ARTS_CULTURE: "Arts & Culture",
  SPORTS_FITNESS: "Sports & Fitness",
  COMMUNITY_CHARITY: "Community & Charity",
  FESTIVALS_FAIRS: "Festivals & Fairs",
};

export const eventCategoryOptions =
  Object.values(EventCategory).map((value) => ({
    value,
    label: eventCategoryLabels[value],
  }));
