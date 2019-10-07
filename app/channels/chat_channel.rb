class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_for "chat_channel"
  end
  def speak(data)
    debugger
    message = Message.new(data["message"])
    debugger
    if(message.save)
      socket = {message: format(message), type: 'message'}
      ChatChannel.broadcast_to('chat_channel', socket)
    else
      ChatChannel.broadcast_to('chat_channel', {message: "db save failed", id: Time.now, type: 'message'})
    end
  end
  def load
    messages = Message.all.collect(&:body)
    socket = { messages: messages, type: 'messages'}
    ChatChannel.broadcast_to('chat_channel', socket)
  end
  def self.update(message)
    socket={message: format(message.to_json), type: 'edit'}
    ChatChannel.broadcast_to('chat_channel', socket)
  end

  def self.update2(jbuilt)
    socket={message: jbuilt, type: 'edit'}
    ChatChannel.broadcast_to('chat_channel', socket)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
  def format(message)
    ApplicationController.render(
      partial: 'api/messages/message',
      locals: {message: message}
    )
  end
  private 
  def message_params
    params.require(:message).permit(:body, :messageable_id, :messageable_type, :user_id)
  end
end
