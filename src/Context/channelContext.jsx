
import { createContext, useEffect, useState } from "react";
import { getChannels } from "../services/channelService";

export const ChannelContext = createContext();

 function ChannelProvider({ wsId, children }) {
    const [channels, setChannels] = useState([]);
    useEffect(() => {
        getChannels(wsId).then(setChannels);
    }, [wsId]);
    return (
        <ChannelContext.Provider value={{ channels }}>
            {children}
        </ChannelContext.Provider>
    );
}

export default ChannelProvider