class NotificationsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "notifications_#{current_user.id}"
    stream_from "notifications_all"
  end

end