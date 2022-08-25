// this will create a global object
const GameConnection = {
    SignalrConnection: {},
    URL: "",
    GameObjectName: "",
    StartCallbackName: "",
    ErrorCallbackName: "",
    ReconnectingCallbackName: "",
    ReconnectedCallbackName: "",
    CloseCallbackName: "",
    NotificationCallbackName: "",
    JoinGameCallbackName: "",
    NewPlayerJoinGameCallbackName: "",
    APlayerLeftZoneCallbackName: "",
    GameUpdateCallbackName: "",
};

function startConnection(url, gameObjectName, startCallbackName, errorCallbackName,
    reconnectingCallbackName, reconnectedCallbackName, closeCallbackName, notificationCallbackName,
    joinGameCallbackName, newPlayerJoinGameCallbackName, aPlayerLeftZoneCallbackName, gameUpdateCallbackName) {

    GameConnection.URL = UTF8ToString(url);
    GameConnection.GameObjectName = UTF8ToString(gameObjectName);
    GameConnection.StartCallbackName = UTF8ToString(startCallbackName);
    GameConnection.ErrorCallbackName = UTF8ToString(errorCallbackName);
    GameConnection.ReconnectingCallbackName = UTF8ToString(reconnectingCallbackName);
    GameConnection.ReconnectedCallbackName = UTF8ToString(reconnectedCallbackName);
    GameConnection.CloseCallbackName = UTF8ToString(closeCallbackName);
    GameConnection.NotificationCallbackName = UTF8ToString(notificationCallbackName);
    GameConnection.JoinGameCallbackName = UTF8ToString(joinGameCallbackName);
    GameConnection.NewPlayerJoinGameCallbackName = UTF8ToString(newPlayerJoinGameCallbackName);
    GameConnection.APlayerLeftZoneCallbackName = UTF8ToString(aPlayerLeftZoneCallbackName);
    GameConnection.GameUpdateCallbackName = UTF8ToString(gameUpdateCallbackName);

    GameConnection.SignalrConnection = new signalR.HubConnectionBuilder().withUrl(GameConnection.URL).withAutomaticReconnect().build();

    GameConnection.SignalrConnection.onreconnecting(error => {
        Game.SendMessage(GameConnection.GameObjectName, GameConnection.ReconnectingCallbackName, error);
    });

    GameConnection.SignalrConnection.onreconnected(connectionId => {
        Game.SendMessage(GameConnection.GameObjectName, GameConnection.ReconnectedCallbackName, connectionId);
    });

    GameConnection.SignalrConnection.onclose(error => {
        Game.SendMessage(GameConnection.GameObjectName, GameConnection.CloseCallbackName, error);
    });

    GameConnection.ErrorCallback = (error) => {
        Game.SendMessage(GameConnection.GameObjectName, GameConnection.ErrorCallbackName, error);
    };

    GameConnection.SignalrConnection.on("Notification",
        function (notification) {
            Game.SendMessage(GameConnection.GameObjectName, GameConnection.NotificationCallbackName, JSON.stringify(notification));
        });

    GameConnection.SignalrConnection.on("NewPlayerJoinGame",
        function (player) {
            Game.SendMessage(GameConnection.GameObjectName, GameConnection.NewPlayerJoinGameCallbackName, JSON.stringify(player));
        });

    GameConnection.SignalrConnection.on("APlayerLeftGame",
        function (id) {
            Game.SendMessage(GameConnection.GameObjectName, GameConnection.APlayerLeftZoneCallbackName, id);
        });

    GameConnection.SignalrConnection.on("GameUpdate",
        function (world) {
            Game.SendMessage(GameConnection.GameObjectName, GameConnection.GameUpdateCallbackName, JSON.stringify(world));
        });

    GameConnection.SignalrConnection.start().then(async function () {
        Game.SendMessage(GameConnection.GameObjectName, GameConnection.StartCallbackName, GameConnection.SignalrConnection.connectionId);
    }).catch(function (error) {
        Game.SendMessage(GameConnection.GameObjectName, GameConnection.ErrorCallbackName, error.toString());
    });

}

async function joinGame(name, gameId) {
    await GameConnection.SignalrConnection.invoke("JoinGame", UTF8ToString(name), UTF8ToString(gameId)).then(function (update) {
        if (update == null || update == "") return;
        Game.SendMessage(GameConnection.GameObjectName, GameConnection.JoinGameCallbackName, JSON.stringify(update));
    }).catch(function (error) {
        Game.SendMessage(GameConnection.GameObjectName, GameConnection.ErrorCallbackName, error);
    });
}

async function leaveGame() {
    await GameConnection.SignalrConnection.invoke("LeaveGame").catch(function (error) {
        Game.SendMessage(GameConnection.GameObjectName, GameConnection.ErrorCallbackName, error);
    });
}

async function sendMessageToAll(message) {
    await GameConnection.SignalrConnection.invoke("SendMessageToAll", UTF8ToString(message)).catch(function (error) {
        Game.SendMessage(GameConnection.GameObjectName, GameConnection.ErrorCallbackName, error);
    });
}

async function move(x, y, z, lookY) {
    await GameConnection.SignalrConnection.invoke("Move", x, y, z, lookY).catch(function (error) {
        Game.SendMessage(GameConnection.GameObjectName, GameConnection.ErrorCallbackName, error);
    });
}

const GameConnectionLib = {
    $GameConnection: GameConnection,
    startConnection,
    joinGame,
    leaveGame,
    sendMessageToAll,
    move
};
autoAddDeps(GameConnectionLib, '$GameConnection');
mergeInto(LibraryManager.library, GameConnectionLib);