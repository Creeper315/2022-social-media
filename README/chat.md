# Getting Started with Create React App

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

# chat:

在 <ChatBox> component 里面，有 io.connect.
所以，每当打开 chat box, ChatBox 组件里就会重新 io.connect

io(endpoint) 和 socket.on 要么在 import 下方，要么在 useeffect 里是因为。
只需要 connect 1 次，
只需要告诉 socket listen on 1 次。

如果在 function component 里面写这些代码，每次 rerender 的时候，socket 的 connection 和 listen on 代码都会重跑，没必要。

# 打开 chat box

useeffect 里面，直接 emit ，告诉 server 我要加入名字为 chatID 的 room
然后 listen on 新的 message 就行。
注意！useeffect 的 return 里面，需要 off 了这个 socket 的 on。不然可能会接听 2 次。

#

点开某个人的名字，
打开 chat box，传进去 userId, username, profile url, 还有 user 的 ChatId
依靠这个 chatId，从 database 里面找到 message history，是一个 array。
把聊天记录画上去，chat 的 senderId 是自己的话，放在右边，是别人，放在左边

# 发送 message

点击发送
先在 socket emit。说明发送者，发送的 text，还有 chatId
Server 就会广播到 chatID 房间，发送者 和 接受这 都能被 广播到。

sender 和 receiever 通过 io.on 'receieve msg' 收到刚刚发送的消息后，画在聊天框上。

如果接受者此时也打开着聊天框，就能通过 socket 接受到这个消息，立刻显示在聊天框上

如果此时接受者没有打开聊天框，这个消息会储存在 database 里面，下次打开 chat box 就会数据库 load 出来

所以，不管接受者怎么样，发送 message 的人，都需要 socket emit 之后，自己把消息储存到 database 里面。

[todo]
pagination；
最上面显示 无更多消息；
回车发送消息。
