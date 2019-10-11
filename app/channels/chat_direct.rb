class ChatDirect < ApplicationCable::Channel
  def subscribed
    @direct = Direct.find(params[:id])
    stream_for @direct
  end
  def speak(data)
    message = Message.new(body: data['message']['body'], user_id: data['message']['currentUser'])
    message.messageable_type = 'Direct'
    message.messageable_id = @direct.id
    if(message.save!)
      socket = {message: format(message), type: 'message', messageable_id: @direct.id, messageable_type: "Chat_Channel"}
      ChatDirect.broadcast_to(@direct, socket)
    else
      ChatDirect.broadcast_to(@direct, {message: "db save failed", id: Time.now, type: 'message'})
    end
  end
  def load
  end
  def self.update(message)
    socket={message: format(message.to_json), type: 'edit'}
    @direct = Direct.find(message[:messageable_id])
    ChatDirect.broadcast_to(@direct, socket)
  end

  def unsubscribed
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
