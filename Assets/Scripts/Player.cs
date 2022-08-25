using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player : MonoBehaviour
{
    public SignalrConnection Connection;
    public CharacterController Controller;
    public float Speed;
    void Start()
    {
        Controller = GetComponent<CharacterController>();
        Connection.OnStarted.AddListener((id) =>
        {
            StartCoroutine(sendMovement());
        });
    }
    IEnumerator sendMovement()
    {
        while (Connection.Connected)
        {
            Connection.Move(transform.position.x, transform.position.y, transform.position.z, transform.rotation.eulerAngles.y);
            yield return new WaitForSeconds(0.2f);
        }
    }
    void Update()
    {
        if (Input.GetKey(KeyCode.W))
        {
            Controller.Move(transform.forward * Speed * Time.deltaTime);
        }
        if (Input.GetKey(KeyCode.S))
        {
            Controller.Move(-transform.forward * Speed * Time.deltaTime);
        }
        if (Input.GetKey(KeyCode.D))
        {
            transform.Rotate(Vector3.up, 1);
        }
        if (Input.GetKey(KeyCode.A))
        {
            transform.Rotate(Vector3.up, -1);
        }
    }
}
