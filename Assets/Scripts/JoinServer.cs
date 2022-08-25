using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class JoinServer : MonoBehaviour
{
    public Button Connect;
    public TMP_InputField Name;
    public TMP_InputField GameId;
    public SignalrConnection Connection;
    void Start()
    {
        Connection.OnStarted.AddListener((id) =>
        {
            Connection.JoinGame(Name.text, GameId.text);
            gameObject.SetActive(false);
        });
        Connect.onClick.AddListener(() =>
        {
            Connection.StartConnection();
        });
    }
}
