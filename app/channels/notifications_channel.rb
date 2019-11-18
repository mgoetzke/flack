class NotificationsChannel < ApplicationCable::Channel
  def subscribed
    user = User.find(params[:currentUserId])
    stream_from "notifications_#{user.id}"
    stream_from "notifications_all"
    user.is_online
    ActionCable.server.broadcast "notifications_all", {userId: user.id, type: 'userAdd'}
  end
  def unsubscribed
    user = User.find(params[:currentUserId])
    user.is_offline
    ActionCable.server.broadcast "notifications_all", {userId: user.id, type: 'userAdd'}
  end

end