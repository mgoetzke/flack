class ChatDirect < ApplicationCable::Channel
  def subscribed
    direct = Direct.find(params[:id]).id
    stream_for direct
  end
  def speak(data)
    message = Message.new(data["message"])
    direct = Direct.find(message.messageable_id)
    if(message.save)
      socket = {message: format(message), type: 'message'}
      ChatDirect.broadcast_to(direct.id, socket)
    else
      ChatDirect.broadcast_to(direct.id, {message: "db save failed", id: Time.now, type: 'message'})
    end
  end
  def load
  end
  def self.update(message)
    socket={message: format(message.to_json), type: 'edit'}
    direct = Direct.find(message[:messageable_id]).id
    ChatDirect.broadcast_to(direct, socket)
  end

  def self.update2(jbuilt)
    socket={message: jbuilt, type: 'edit'}
    ChatDirect.broadcast_to(direct, socket)
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
