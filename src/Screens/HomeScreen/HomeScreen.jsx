import React, { useContext, useEffect } from 'react'
import { WorkspaceContext } from '../../Context/workspaceContext'
import { Navigate, useNavigate } from 'react-router'
import './HomeScreen.css'

const HomeScreen = () => {

    const navigate = useNavigate()
    const { workspace_list_loading, workspace_list_error, workspace_list } = useContext(WorkspaceContext)

    useEffect(() => {
        if (!workspace_list_loading && workspace_list && workspace_list.data?.workspaces?.length === 0) {
            navigate('/create-workspace')
        }
    }, [workspace_list_loading, workspace_list, navigate])

    if (workspace_list_loading || !workspace_list) {
        return (
            <div className="loading-container">
                <span>Cargando tus espacios de trabajo...</span>
            </div>
        )
    }

    return (
        <div className="home-screen-container">
            <header className="home-screen-header">
                <h1>¡Hola de nuevo!</h1>
                <p>Elige uno de tus espacios de trabajo para continuar.</p>
            </header>

            <div className="workspace-list">
                {
                    workspace_list_error && <span className="error-message">{workspace_list_error.message}</span>
                }
                {
                    (workspace_list.data.workspaces && workspace_list.data.workspaces.length > 0)
                        ? workspace_list.data.workspaces.map(
                            (item) => {
                                const workspaceData = item.fk_id_Workspace || item
                                const id = workspaceData._id || item._id || workspaceData.id
                                const title = workspaceData.title || workspaceData.name || workspaceData.workspace_title || 'Sin título'
                                const initial = title.charAt(0)

                                const memberCount = workspaceData.memberCount ?? 0
                                const memberText = memberCount === 1 ? '1 miembro' : `${memberCount} miembros`

                                return (
                                    <div className='workspace-item' key={id} onClick={() => navigate(`/workspace/${id}`)} >
                                        <div className="workspace-icon">
                                            {initial}
                                        </div>
                                        <div className="workspace-info">
                                            <span className="workspace-title">{title}</span>
                                            <span className="workspace-link-text">{memberText}</span>
                                        </div>
                                    </div>
                                )
                            }
                        )
                        : <div className="empty-state">
                            <span>No tienes espacios de trabajo.</span>
                            <br />
                            <button onClick={() => navigate('/create-workspace')} className="create-btn">Crear uno nuevo</button>
                        </div>
                }
            </div>
            <button onClick={() => navigate('/create-workspace')} className="create-btn">Crear uno nuevo</button>
        </div>
    )
}

export default HomeScreen
