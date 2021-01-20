```csharp
using TwitchLib.Client;
using TwitchLib.Client.Models;

void Main() 
{
	TwitchClient client = new TwitchClient();
	client.Initialize(new ConnectionCredentials("justinfan<randomnumber>", ""));

	client.Connect();

	Console.ReadLine(); 
}
```
