```java
import com.github.twitch4j.chat.*;
// ...
TwitchChat chat = TwitchChatBuilder.builder()
	.withBaseUrl("wss://irc.fdgt.dev") // Requires Twitch4J version 1.1.0+
	.build();
```
