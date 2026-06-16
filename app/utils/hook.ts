import { useContext} from "react";
import { CustomHookContext } from "./context";
import { CustomHookState,CustomHookActionEnum, UserByTypeEnum,RightComponentToggleOptionsEnum} from "./types";

const HARDCODED_USERS = [
    { name: "Alice Jensen", role: UserByTypeEnum.DEV_EMPLOYEE },
    { name: "Bob Andersen", role: UserByTypeEnum.DEV_EMPLOYEE },
    { name: "Clara Nielsen", role: UserByTypeEnum.DEV_EMPLOYEE },
    { name: "David Møller", role: UserByTypeEnum.PRODUCT_TEAM_EMPLOYEE },
    { name: "Emma Christensen", role: UserByTypeEnum.PRODUCT_TEAM_EMPLOYEE },
    { name: "Frank Larsen", role: UserByTypeEnum.PRODUCT_TEAM_EMPLOYEE },
    { name: "Grace Hansen", role: UserByTypeEnum.TOP_MANAGEMENT },
    { name: "Henrik Pedersen", role: UserByTypeEnum.TOP_MANAGEMENT },
];

const useCustomHook = () => {
    const context = useContext(CustomHookContext);
    if (!context) {
        throw new Error("useCustomHook must be used within a CustomHookProvider");
    }
    const { state, dispatch } = context;

    const fetchCustomHookData = () => {
        setCustomHookState({ nameAndRole: HARDCODED_USERS, activeUserByTypeTab: null, usersByTypeData: HARDCODED_USERS });
    }

    const setCustomHookState=(customHookState:Partial<CustomHookState>)=>{
        dispatch({ type: CustomHookActionEnum.SET_CUSTOM_HOOK_DATA, payload: customHookState });
    }

    const setActiveUserByTypeTab = (selectedUserByTypeTab: UserByTypeEnum | null) => {
        const filtered = selectedUserByTypeTab
            ? HARDCODED_USERS.filter(u => u.role === selectedUserByTypeTab)
            : HARDCODED_USERS;
        setCustomHookState({ activeUserByTypeTab: selectedUserByTypeTab, usersByTypeData: filtered, isLoading: false });
    }

    const setIsLoading = (isLoading: boolean) => {
        setCustomHookState({ isLoading });
    }

    const setActiveRightPanelToggle = (activeRightPanelToggle: RightComponentToggleOptionsEnum | null) => {
        setCustomHookState({ activeRightPanelToggle });
    }

    return {
        ...state,
        // This was basic learning.
        // loadCustomHookData,
        fetchCustomHookData,
        setCustomHookState,
        setActiveUserByTypeTab,
        setIsLoading,
        setActiveRightPanelToggle,
    };
};

export { useCustomHook };
