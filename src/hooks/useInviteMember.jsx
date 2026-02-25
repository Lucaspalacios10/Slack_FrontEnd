import { useState } from "react"
import useRequest from "./useRequest"
import { inviteToWorkspace } from "../services/workspaceService"
import useForm from "./useForm"

const useInviteMember = (workspace_id) => {
    const { loading, response, error, sendRequest } = useRequest()
    const [successMessage, setSuccessMessage] = useState(null)

    const handleInvite = async (form_values) => {
        setSuccessMessage(null)
        await sendRequest(async () => {
            await inviteToWorkspace(workspace_id, form_values.email, form_values.role || 'User')
            setSuccessMessage(`Invitación enviada con éxito a ${form_values.email}`)
        })
    }

    const { form_state, onChangeFieldValue, onSubmitForm } = useForm({
        initial_form_fields: {
            email: '',
            role: 'User'
        },
        onSubmit: handleInvite
    })

    return {
        form_state,
        onChangeFieldValue,
        onSubmitForm,
        isLoading: loading,
        error,
        successMessage,
        response
    }
}

export default useInviteMember
