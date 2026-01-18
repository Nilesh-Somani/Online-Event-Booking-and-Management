import {
    MusicIcon,
    TechnologyIcon,
    SportsIcon,
    ArtsIcon,
    FoodIcon,
    BusinessIcon,
    EducationIcon,
    HealthIcon,
    CommunityIcon,
    TravelIcon,
    DefaultCategoryIcon,
} from "../components/Icon";

export const CATEGORY_ICON_MAP = {
    Music: MusicIcon,
    Technology: TechnologyIcon,
    Sports: SportsIcon,
    Fitness: SportsIcon,
    Arts: ArtsIcon,
    Culture: ArtsIcon,
    Food: FoodIcon,
    Drink: FoodIcon,
    Business: BusinessIcon,
    Education: EducationIcon,
    Health: HealthIcon,
    Wellness: HealthIcon,
    Travel: TravelIcon,
    Outdoor: TravelIcon,
    Community: CommunityIcon,
};

export const getCategoryIcon = (category) =>
    CATEGORY_ICON_MAP[category] || DefaultCategoryIcon;