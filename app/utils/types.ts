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

type DossierStatus = "draft" | "active" | "delayed" | "completed" | "predraft";

interface Dossier {
    id: string;
    name: string;
    status: DossierStatus;
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
    name: "DK 6000 → DE 34117",
    status: "draft",
    bookingIds: [],
    pendingBookingIds: [],
    isNew: true,
};

const DUMMY_DOSSIERS: Dossier[] = [
    DEFAULT_DOSSIER,
    { id: "dossier-2",  name: "DK 8000 → SE 21120", status: "draft",     bookingIds: ["1", "2"],      pendingBookingIds: [], isNew: false },
    { id: "dossier-3",  name: "DK 9000 → NO 0150",  status: "active",    bookingIds: ["3", "6"],      pendingBookingIds: [], isNew: false },
    { id: "dossier-4",  name: "DK 5000 → NL 3011",  status: "delayed",   bookingIds: ["8", "11"],     pendingBookingIds: [], isNew: false },
    { id: "dossier-5",  name: "DK 6700 → DE 20095", status: "draft",     bookingIds: ["13"],          pendingBookingIds: [], isNew: false },
    { id: "dossier-6",  name: "DK 7100 → PL 80001", status: "active",    bookingIds: ["5", "7", "9"], pendingBookingIds: [], isNew: false },
    { id: "dossier-7",  name: "DK 2100 → FI 00100", status: "completed", bookingIds: ["10", "12"],    pendingBookingIds: [], isNew: false },
    { id: "dossier-8",  name: "DK 8700 → DE 24103", status: "delayed",   bookingIds: ["4"],           pendingBookingIds: [], isNew: false },
    { id: "dossier-9",  name: "DK 7700 → SE 41104", status: "predraft",  bookingIds: ["14"],          pendingBookingIds: [], isNew: false },
    { id: "dossier-10", name: "DK 3000 → BE 2000",  status: "draft",     bookingIds: [],              pendingBookingIds: [], isNew: false },
];

const customHookInitialState: CustomHookState = {
    nameAndRole:[],
    activeUserByTypeTab: null,
    usersByTypeData: [],
    isLoading: false,
    activeRightPanelToggle: RightComponentToggleOptionsEnum.LIST,
    dossiers: DUMMY_DOSSIERS,
    activeDossierId: DEFAULT_DOSSIER.id,
    dossierCounter: DUMMY_DOSSIERS.length,
};

export type { CustomHookState, CustomHookAction, UserType, Dossier, DossierStatus };
export { customHookInitialState, CustomHookActionEnum, UserByTypeEnum, RightComponentToggleOptionsEnum };
