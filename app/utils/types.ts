enum CustomHookActionEnum {
    SET_CUSTOM_HOOK_DATA = "SET_CUSTOM_HOOK_DATA",
    SET_NAME_AND_ROLE = "SET_NAME_AND_ROLE",
}

enum UserByTypeEnum {
    DEV_EMPLOYEE = "DEV_EMPLOYEE",
    PRODUCT_TEAM_EMPLOYEE = "PRODUCT_TEAM_EMPLOYEE",
    TOP_MANAGEMENT= "TOP_MANAGEMENT",
}

enum RightComponentToggleOptionsEnum {
    MAP = "Map",
    GRID = "Grid",
    LIST = "List",
}

interface UserType {
    name: string | null;
    role: string | null;
}

interface Dossier {
    id: string;
    name: string;
    bookingIds: string[];
    pendingBookingIds: string[];
    isNew: boolean;
}

interface CustomHookState {
    nameAndRole: UserType[],
    activeUserByTypeTab: UserByTypeEnum|null,
    usersByTypeData: UserType[],
    isLoading: boolean,
    activeRightPanelToggle: RightComponentToggleOptionsEnum|null,
    dossiers: Dossier[],
    activeDossierId: string | null,
    dossierCounter: number,
}

type CustomHookAction =
    { type: CustomHookActionEnum.SET_CUSTOM_HOOK_DATA; payload: Partial<CustomHookState> }
    | { type: CustomHookActionEnum.SET_NAME_AND_ROLE; payload: UserType[] };

const DEFAULT_DOSSIER: Dossier = {
    id: "dossier-1",
    name: "Dossier 1",
    bookingIds: [],
    pendingBookingIds: [],
    isNew: true,
};

const customHookInitialState: CustomHookState = {
    nameAndRole:[],
    activeUserByTypeTab: null,
    usersByTypeData: [],
    isLoading: false,
    activeRightPanelToggle: RightComponentToggleOptionsEnum.LIST,
    dossiers: [DEFAULT_DOSSIER],
    activeDossierId: DEFAULT_DOSSIER.id,
    dossierCounter: 1,
};

export type { CustomHookState, CustomHookAction, UserType, Dossier };
export { customHookInitialState, CustomHookActionEnum, UserByTypeEnum, RightComponentToggleOptionsEnum };
