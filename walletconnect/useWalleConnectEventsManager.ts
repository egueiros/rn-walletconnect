import { walletConnectClient } from './WalletConnectUtil'
import { useCallback, useEffect } from "react";
import { CLIENT_EVENTS } from "@walletconnect/client";

export default function useWalletConnectEventsManager(initialized: boolean) {
  /******************************************************************************
   * 1. Open session proposal modal for confirmation / rejection
   *****************************************************************************/
  const onSessionProposal = useCallback((proposal: SessionTypes.Proposal) => {
    console.log('onSessionProposal', proposal);
  }, [])

  /******************************************************************************
   * 2. [Optional] hanle session created
   *****************************************************************************/
  const onSessionCreated = useCallback((created: SessionTypes.Created) => {
    console.log('onSessionCreated', created);
  }, [])

  /******************************************************************************
   * 3. Open request handling modal based on method that was used
   *****************************************************************************/
  const onSessionRequest = useCallback(async (requestEvent: SessionTypes.RequestEvent) => {
    const { topic, request } = requestEvent
    const { method } = request
    const requestSession = await walletConnectClient.session.get(topic)

    console.log('onSessionRequest', method, requestSession);

  }, [])

  /******************************************************************************
   * Set up WalletConnect event listeners
   *****************************************************************************/
  useEffect(() => {
    if (initialized) {
      walletConnectClient.on(CLIENT_EVENTS.session.proposal, onSessionProposal)

      walletConnectClient.on(CLIENT_EVENTS.session.created, onSessionCreated)

      walletConnectClient.on(CLIENT_EVENTS.session.request, onSessionRequest)
    }
  }, [initialized, onSessionProposal, onSessionCreated, onSessionRequest])
}
