---
title: Getting Started
description: Get started with FDGT in the official documentation, and learn more about all our features!
---

# How does it work?

Using `fdgt` is pretty simple. Instead of pointing to `irc.chat.twitch.tv` or `irc-ws.chat.twitch.tv`, point your library to `irc.fdgt.dev`. DONE.

## Wait seriously?

Yup.

## It can't be that simple!

It is, tho. Have some examples.

### Connecting to the real Twitch IRC

[[ CodeTemplate template=NormalConnect ]]

### Connecting to the `fdgt` mock IRC

[[ CodeTemplate template=FDGTConnect ]]

## Simulating events

One of the hardest parts of working with the Twitch chat API is that to test your tool with different payloads, you have to perform the real action that would trigger that event.

**Need to trigger a message with bits?** You're going to be cheering a lot.

**Need to simulate a subscription?** I hope you've got deep pockets.

**Need to simulate a `submysterygift` with 10 Tier 3 subscriptions?** God help you.

Instead of blowing the wads of cash that you probably don't have, use `fdgt`! With `fdgt`, you just have to send the right message to the chat service, and it'll trigger the appropriate event! Here's an example of triggering a message with bits:

[[ CodeTemplate template=PRIVMSG channel=TrezyCodes message="bits" ]]

And just like that, `fdgt` will fire a simulated message with bits attached!

## Getting a specific response

Sometimes, the randomized events that `fdgt` generates just aren't specific enough. Fortunately, `fdgt`'s interface is controlled just like a CLI! If you want to change the username of the person that "triggered" the event, you can pass it with the `--username` flag!

[[ CodeTemplate template=PRIVMSG channel=TrezyCodes message="bits --username alca" ]]

...or, say you want to simulate that 10x Tier 3 `submysterygift` we mentioned earlier:

[[ CodeTemplate template=PRIVMSG channel=TrezyCodes message="submysterygift --tier 3 --username alca --giftcount 10" ]]

For more information on what events are available and what parameters they support, check out the [events][events] section.





[discord]: https://discord.gg/k3bth3f "Trezy Studios Discord"
