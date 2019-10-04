require 'Time'
class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_for "chat_channel"
  end
  def speak(data)
    message = Message.new(data["message"])
    # THIS IS WHERE I HARD CODE THE MESSAGEABLE TYPE
    message.messageable_type = "Channel"
    if(message.save)
      socket = {message: message.body, id: message.id,type: 'message'}
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
  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
  private 
  def message_params
    params.require(:message).permit(:body, :messageable_id, :messageable_type, :user_id)
  end
end
