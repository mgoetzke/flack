# Flack

**flack** is a web-based instant-messaging application that improves workplace communication and collaboration. A live demo is available at http://flackflack.herokuapp.com/
 
## Tech/Framework Used
**flack** was built with
+ Ruby on Rails
+ React/Redux
+ JavaScript
+ Action Cable for WebSockets.


## Features
+ Live messaging
+ Message editing
+ Create, browse, and join channels for topic-based discussion
+ Privacy feature on channels for protection of sensitive discussions
+ Direct messaging between individuals and groups

## Feature Highlights
Live messaging

![alt text](https://media.giphy.com/media/TKRVyMb5SxLxAgwLMP/giphy.gif "sample conversation")

Live message editing

![alt text](https://media.giphy.com/media/l2ExAAkcFEbtl2WRpS/giphy.gif "sample conversation")

*./app/controllers/api/messages_controller.rb*
```ruby
def update
    @message = Message.find(params[:id])
    if @message.update_attributes(message_params)
        broadcastEdit(formatEdit(@message))
        render :show
    else
        render json: ['Sorry, your update did not work.'], status: 400
    end
end
```
```ruby
def broadcastEdit(message)
    ChatChannel.update(message)
end
```
*./app/channels/chat_channel.rb*
```ruby
def self.update(message)
    socket={message: format(message.to_json), type: 'edit'}
    channel = Channel.find(message[:messageable_id]).id
    ChatChannel.broadcast_to(channel, socket)
end
```
## Future Features
+ Notifications
+ Emoji reactions 🎉

## How To Use
+ Clone git locally
+ Run npm install and bundle install
+ Open separate sessions in browser using incognito mode to highlight instant messaging
