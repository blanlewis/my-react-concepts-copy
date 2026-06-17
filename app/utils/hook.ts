import { useContext } from "react";
import { CustomHookContext } from "./context";
import { CustomHookState, CustomHookActionEnum, UserByTypeEnum, RightComponentToggleOptionsEnum, Dossier } from "./types";

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
    };

    const setCustomHookState = (customHookState: Partial<CustomHookState>) => {
        dispatch({ type: CustomHookActionEnum.SET_CUSTOM_HOOK_DATA, payload: customHookState });
    };

    const setActiveUserByTypeTab = (selectedUserByTypeTab: UserByTypeEnum | null) => {
        const filtered = selectedUserByTypeTab
            ? HARDCODED_USERS.filter(u => u.role === selectedUserByTypeTab)
            : HARDCODED_USERS;
        setCustomHookState({ activeUserByTypeTab: selectedUserByTypeTab, usersByTypeData: filtered, isLoading: false });
    };

    const setIsLoading = (isLoading: boolean) => {
        setCustomHookState({ isLoading });
    };

    const setActiveRightPanelToggle = (activeRightPanelToggle: RightComponentToggleOptionsEnum | null) => {
        setCustomHookState({ activeRightPanelToggle });
    };

    const setActiveDossierId = (id: string | null) => {
        const { dossiers, activeDossierId } = state;
        // Clear pending selections from the dossier we're leaving
        const updatedDossiers = dossiers.map(d =>
            d.id === activeDossierId ? { ...d, pendingBookingIds: [] } : d
        );
        setCustomHookState({ dossiers: updatedDossiers, activeDossierId: id });
    };

    // When checkbox is clicked in UpComponent:
    // - No active dossier → auto-create a new pending dossier and add the booking
    // - Active dossier → toggle the booking in that dossier's pending list
    const toggleBookingInDossier = (bookingId: string) => {
        const { dossiers, activeDossierId, dossierCounter } = state;

        if (!activeDossierId) {
            const newCounter = dossierCounter + 1;
            const newDossier: Dossier = {
                id: `dossier-${newCounter}`,
                name: `Dossier ${newCounter}`,
                bookingIds: [],
                pendingBookingIds: [bookingId],
                isNew: true,
            };
            setCustomHookState({
                dossiers: [...dossiers, newDossier],
                activeDossierId: newDossier.id,
                dossierCounter: newCounter,
            });
            return;
        }

        const updatedDossiers = dossiers.map(d => {
            if (d.id !== activeDossierId) return d;
            if (d.bookingIds.includes(bookingId)) {
                return { ...d, bookingIds: d.bookingIds.filter(id => id !== bookingId) };
            }
            if (d.pendingBookingIds.includes(bookingId)) {
                return { ...d, pendingBookingIds: d.pendingBookingIds.filter(id => id !== bookingId) };
            }
            return { ...d, pendingBookingIds: [...d.pendingBookingIds, bookingId] };
        });
        setCustomHookState({ dossiers: updatedDossiers });
    };

    // Merge pending bookings into confirmed; mark dossier as no longer new
    const acceptDossier = (dossierId: string) => {
        const updatedDossiers = state.dossiers.map(d => {
            if (d.id !== dossierId) return d;
            return {
                ...d,
                bookingIds: [...d.bookingIds, ...d.pendingBookingIds],
                pendingBookingIds: [],
                isNew: false,
            };
        });
        setCustomHookState({ dossiers: updatedDossiers });
    };

    // Cancel: delete the dossier if it's brand new, otherwise just clear pending
    const cancelDossier = (dossierId: string) => {
        const { dossiers, dossierCounter } = state;
        const dossier = dossiers.find(d => d.id === dossierId);
        if (!dossier) return;

        if (dossier.isNew) {
            const remaining = dossiers.filter(d => d.id !== dossierId);
            if (remaining.length > 0) {
                setCustomHookState({
                    dossiers: remaining,
                    activeDossierId: remaining.at(-1)!.id,
                });
            } else {
                // Always keep at least one tab — create a fresh default
                const newCounter = dossierCounter + 1;
                const fresh = { id: `dossier-${newCounter}`, name: `Dossier ${newCounter}`, bookingIds: [], pendingBookingIds: [], isNew: true };
                setCustomHookState({ dossiers: [fresh], activeDossierId: fresh.id, dossierCounter: newCounter });
            }
        } else {
            setCustomHookState({
                dossiers: dossiers.map(d =>
                    d.id === dossierId ? { ...d, pendingBookingIds: [] } : d
                ),
            });
        }
    };

    // Plus icon: open a new blank pending dossier tab
    const createNewDossier = () => {
        const { dossiers, dossierCounter } = state;
        const newCounter = dossierCounter + 1;
        const newDossier: Dossier = {
            id: `dossier-${newCounter}`,
            name: `Dossier ${newCounter}`,
            bookingIds: [],
            pendingBookingIds: [],
            isNew: true,
        };
        setCustomHookState({
            dossiers: [...dossiers, newDossier],
            activeDossierId: newDossier.id,
            dossierCounter: newCounter,
        });
    };

    return {
        ...state,
        fetchCustomHookData,
        setCustomHookState,
        setActiveUserByTypeTab,
        setIsLoading,
        setActiveRightPanelToggle,
        setActiveDossierId,
        toggleBookingInDossier,
        acceptDossier,
        cancelDossier,
        createNewDossier,
    };
};

export { useCustomHook };
