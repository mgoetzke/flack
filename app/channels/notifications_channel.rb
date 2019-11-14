class NotificationsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "notifications_#{current_user.id}"
    stream_from "notifications_all"
    current_user.is_online
    ActionCable.server.broadcast "notifications_all", {userId: current_user.id, type: 'userAdd'}
  end
  def unsubscribed
    current_user.is_offline
    ActionCable.server.broadcast "notifications_all", {userId: current_user.id, type: 'userAdd'}
  end

end