```csharp
// Additional package to downloaded from NuGet
// https://www.nuget.org/packages/TwitchLib.Communication.Clients.FDGTClient/
// - TwitchLib.Communication.Clients.FDGTClient 

using TwitchLib.Client;
using TwitchLib.Communication.Clients;
using TwitchLib.Client.Models;

void Main() 
{
	TwitchClient client = new TwitchClient(new FDGTClient());
	client.Initialize(
		new ConnectionCredentials(
			"fdgttest", // Bot username
			""			// Oauth token
		), "fdgt"		// Channel to join
	);

	client.Connect();

	// TwitchLib doesn't block the thread,
	// so you need to block it someway.
	Console.ReadLine(); 
}
```
