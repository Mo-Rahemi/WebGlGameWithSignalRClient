using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class Chat : MonoBehaviour
{
    public Button Send;
    public TMP_InputField MyChat;
    public TextMeshProUGUI IncomingChat;
    public SignalrConnection Connection;
    void Start()
    {
        Send.onClick.AddListener(() =>
        {
            if (Connection.Connected)
            {
                Connection.SendMessageToAll(MyChat.text);
            }
        });
        Connection.OnNotification.AddListener((notification) =>
        {
            IncomingChat.text += "<br>" + string.Format("{0}-{1} : {2}", notification.Time, notification.Name, notification.Message);
        });
        Connection.OnYouJoinedGame.AddListener((update) =>
        {
            IncomingChat.text += "<br>" + "you joined the game.";
        });
        Connection.OnNewPlayerJoinGame.AddListener((player) =>
        {
            IncomingChat.text += "<br>" + string.Format("{0} joined the game.", player.Name);
        });
        Connection.OnAPlayerLeftGame.AddListener((id) =>
        {
            IncomingChat.text += "<br>" + "a player left the game.";
        });
    }
}
