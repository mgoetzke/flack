class NotificationsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "notifications_#{current_user.id}"
  end

  def self.sendChannel(membership)

    socket = {channelId: membership.memberable_id, userId: membership.memberable_id, type: 'channelAdd'}
    NotificationChannel.broadcast_to("notifications_#{current_user.id}", socket)
  end
end