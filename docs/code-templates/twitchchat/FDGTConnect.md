```rust
use twitchchat::{Connector, Dispatcher, Runner};
use tokio::net::TcpStream;

let dispatcher = Dispatcher::new();
let(mut runner, mut control) = Runner::new(dispatcher.clone());

// Uses a tokio TcpStream instead of the connect_easy wrapper
let connector = Connector::new(|| async move {
    TcpStream::connect("irc.fdgt.dev:6667").await
});

runner.run_to_completion(connector).await;
```
