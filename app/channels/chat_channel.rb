class ChatChannel < ApplicationCable::Channel
  def subscribed
    @channel = Channel.find(params[:id])
    stream_for @channel
  end
  def speak(data)
    message = Message.new(body: data['message']['body'], user_id: data['message']['currentUser'])
    message.messageable_type = 'Channel'
    message.messageable_id = @channel.id
    if(message.save!)
      socket = {message: format(message), type: 'message', messageable_id: @channel.id, messageable_type: "Chat_Channel"}
      ChatChannel.broadcast_to(@channel, socket)
    else
      ChatChannel.broadcast_to(@channel, {message: "db save failed", id: Time.now, type: 'message'})
    end
  end

  def self.update(message)
    socket={message: format(message.to_json), type: 'edit'}
    @channel = Channel.find(message[:messageable_id])
    ChatChannel.broadcast_to(@channel, socket)
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
