declare namespace Store {
  export interface AppStore {
    auth: {
      user?: Entity.User;
      attemptedLogin: boolean;
    };
    config: {
      memberListToggled: boolean;
    };
    entities: {
      channels: {
        typing: { userId: string, channelId: string }[];
      };
      guilds: Entity.Guild[];
      messages: Entity.Message[];
      users: Entity.User[];
    };
    // metadata about store
    meta: {
      hasListenedToWS: boolean;
    };
    ui: {
      openDropdown?: string;
      openModal?: string;
      activeChannel?: Entity.Channel;
      activeGuild?: Entity.Guild;
      activeInvite?: Entity.Invite;
      editingMessageId?: string;
    };
  }  
}