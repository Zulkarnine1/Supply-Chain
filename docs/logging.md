1. Use the npm package - truffle-assertions. This helps to listen to sol events.

```
const truffleAssert = require("truffle-assertions")

```

2. Create an event on sol -

```
event MyLogString(bytes32 log);
```

3. Call the event like -

```
emit MyLogString(message);
```

4. On the client-side listen to the event as follows -

```
truffleAssert.eventEmitted(undefined, "MyLogString", (ev) => {
    console.log(ev);
});

```
