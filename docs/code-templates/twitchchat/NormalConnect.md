```rust
use twitchchat::{
    Connector, 
    Dispatcher, 
    Runner, 
    native_tls
};

let dispatcher = Dispatcher::new();
let(mut runner, mut control) = Runner::new(dispatcher.clone());

// nick and pass are your twitch credentials in quotes
let connector = Connector::new(|| async move {
    twitchchat::native_tls::connect_easy(nick, pass).await
});

runner.run_to_completion(connector).await;
```
