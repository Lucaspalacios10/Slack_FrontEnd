import React, { useContext, useEffect } from 'react'
import { WorkspaceContext } from '../../Context/workspaceContext'
import { Navigate, useNavigate } from 'react-router'
import './HomeScreen.css'

const HomeScreen = () => {

    const navigate = useNavigate()
    const { workspace_list_loading, workspace_list_error, workspace_list } = useContext(WorkspaceContext)
    console.log('HomeScreen render:', { loading: workspace_list_loading, list: workspace_list })

    useEffect(() => {
        if (!workspace_list_loading && workspace_list && workspace_list.data?.workspaces?.length === 0) {
            navigate('/create-workspace')
        }
    }, [workspace_list_loading, workspace_list, navigate])

    if (workspace_list_loading || !workspace_list) {
        return <span>Loading...</span>
    }

    return (
        <div style={{ backgroundColor: '#4a154b', padding: '16px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{color: 'white', marginBottom: '16px'}}>Espacios de trabajo</h1>

            {
                workspace_list_error && <span>{workspace_list_error.message}</span>
            }
            {
                /* Valida si hay workspaces, si es null o vacio no renderiza nada o muestra un msj */
                (workspace_list.data.workspaces && workspace_list.data.workspaces.length > 0)
                    ? workspace_list.data.workspaces.map(
                        (item) => {
                            const workspaceData = item.fk_id_Workspace || item
                            const id = workspaceData._id || item._id || workspaceData.id
                            const title = workspaceData.title || workspaceData.name || workspaceData.workspace_title || 'Sin título'
                            return (
                                <div className='workspace-chats-container' key={id} onClick={() => navigate(`/workspace/${id}`)} >
                                    {title}
                                </div>
                            )
                        }
                    )
                    : <span>No tienes espacios de trabajo. Crea uno nuevo.</span>
            }
        </div>
    )
}

export default HomeScreen
