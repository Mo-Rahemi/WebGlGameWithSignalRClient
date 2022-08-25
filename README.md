# Online web game (webgl) with unity and SignalR server

If you want to make an online web game (webgl) in unity with signalR server, you can start from this example and tutorial.

Prerequisites :
* Unity editor 2021.3
* Standard Pipline (Core)

to run this example :
1.download this repository. (see Prerequisites)
2.downlaod SignalR Server from https://github.com/Mo-Rahemi/SignalRGameServerSample.(see Prerequisites)
3.set target to webgl.
4.start the server. (check listening url (address and port) like http://localhost:5004/GameHub)
5.set server url in SignalRConnection Class.
5.build and run game in broweser. (you cannot check connection in editor because we use javascript client so we need run in browser)


Step by step tutorial :
1.Create a simple SignalR server (you can find mine here https://github.com/Mo-Rahemi/SignalRGameServerSample)
2.Create a webgl template file then import SingalR javascript client files to your game.
#* Note: SingalR javascript client files can be found here : https://docs.microsoft.com/en-us/aspnet/core/signalr/javascript-client?view=aspnetcore-6.0&tabs=visual-studio
#* Note: how to create a webgl template? see here : https://docs.unity3d.com/Manual/webgl-templates.html  (or simply copy mine into asset folder of your project) 
3.when you create a webgl template, name it simply with changing folder name (my template name is signalr), copy javascript files int "TemplateData" folder, then add flowing line to "index.html" (if you use my template skip this step) :

- copy SignalR javascript files to "TemplateData" folder. (needed for connecting to SignalR server)
- add this line in head of "index.html" : <script src="TemplateData/signalr.js"></script>  (needed for connecting to SignalR server)
- add this line : window.Game=unityInstance; in script.onload in "index.html". so must be like below :  (needed for Accessing our object in game)

      script.onload = () => {
        createUnityInstance(canvas, config, (progress) => {
          progressBarFull.style.width = 100 * progress + "%";
        }).then((unityInstance) => {
          loadingBar.style.display = "none";
          fullscreenButton.onclick = () => {
            unityInstance.SetFullscreen(1);
          };
	  window.Game=unityInstance; //<-------------------------------- this line
        }).catch((message) => {
          alert(message);
        });
      };
      
4.change webgl template of your project (project setting -> player -> webgl -> Resolution and Presentation (section) -> webgl template) select your template my template name is signalr.
5.create a jslib file that is a javascript file (under assets/plugins folder), and add your code for connecting and interacting with SignalR server and unity game both.
* Note : You can see my code here : https://github.com/Mo-Rahemi/WebGlGameWithSignalRClient/blob/main/Assets/Plugins/SignalrConnection.jslib
* Note : What is jslib file ? see here : https://docs.unity3d.com/Manual/webgl-interactingwithbrowserscripting.html
6. run the game and enjoy.
