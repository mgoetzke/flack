class ChatChannel < ApplicationCable::Channel
  def subscribed
    channel = Channel.find(params[:id]).id
    stream_for channel
  end
  def speak(data)
    message = Message.new(data["message"])
    channel = Channel.find(message.messageable_id)

    if(message.save)
      socket = {message: format(message), type: 'message'}
      ChatChannel.broadcast_to(channel.id, socket)
    else
      ChatChannel.broadcast_to(channel.id, {message: "db save failed", id: Time.now, type: 'message'})
    end
  end
  def load
    # messages = Message.all.collect(&:body)
    # socket = { messages: messages, type: 'messages'}
    # ChatChannel.broadcast_to('chat_channel', socket)
  end
  def self.update(message)
    channel = Channel.find(message.messageable_id)
    socket={message: format(message.to_json), type: 'edit'}
    ChatChannel.broadcast_to(channel, socket)
  end

  def self.update2(jbuilt)
    socket={message: jbuilt, type: 'edit'}
    ChatChannel.broadcast_to(channel, socket)
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
