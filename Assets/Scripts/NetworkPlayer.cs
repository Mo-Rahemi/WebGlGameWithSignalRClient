using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

public class NetworkPlayer : MonoBehaviour
{
    public SignalrConnection Connection;
    public PlayerInformation ServerPlayerInformation;

    private void Start()
    {
        Connection.OnGameUpdate.AddListener((update) =>
        {
            var myInformation = update.PlayerInformations.FirstOrDefault(x => x.Id == ServerPlayerInformation.Id);
            if (myInformation == null) return;
            transform.position = myInformation.Position;
            transform.rotation = Quaternion.AngleAxis(myInformation.LookAt, Vector3.up);
        });
    }
}
