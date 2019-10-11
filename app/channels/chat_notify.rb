class NotificationsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "notifications_#{current_user.id}"
  end

  def self.sendChannel(channel)
      socket = {message: channel, type: 'channelAdd'}
      NotificationChannel.broadcast_to(current_user.id, socket)
  end
end