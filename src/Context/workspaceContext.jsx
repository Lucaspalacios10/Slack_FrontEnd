import { createContext, useEffect } from "react";
import useRequest from "../hooks/useRequest.jsx";
import { getWorkspaceList } from "../services/workspaceService.js";

export const WorkspaceContext = createContext(
    {
        workspace_list_loading: false,
        workspace_list: null,
        workspace_list_error: null
    }
)

const WorkspaceContextProvider = ({ children }) => {
    const { loading, response, error, sendRequest } = useRequest()

    const getWorkspaces = () => {
        console.log('Context: getWorkspaces called')
        sendRequest(getWorkspaceList)
    }




    useEffect(
        () => {
            getWorkspaces()
        },
        []
    )


    const provider_values = {
        workspace_list_loading: loading,
        workspace_list: response,
        workspace_list_error: error,
        getWorkspaces
    }
    return (
        <WorkspaceContext.Provider
            value={provider_values}>
            {children}
        </WorkspaceContext.Provider>
    )
}

export default WorkspaceContextProvider
