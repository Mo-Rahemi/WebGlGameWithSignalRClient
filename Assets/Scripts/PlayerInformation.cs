using UnityEngine;

public class PlayerInformation
    {
        public string Id { get; set; } = "";
        public string Name { get; set; } = "";
        public string GameId { get; set; } = "";
        public Vector3 Position { get; set; } = Vector3.zero;
        public float LookAt { get; set; } = 0f;
    }

