class NotificationsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "notifications_channel_#{current_user.id}"
  end

  def notificate(membership)

    socket = {channelId: membership.memberable_id, userId: membership.memberable_id, type: 'channelAdd'}
    ActionCable.server.broadcast("notifications_channel_#{current_user.id}", socket)
  end
end