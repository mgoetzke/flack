class NotificationsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "notifications_#{current_user.id}"
  end

  def self.sendMembership(membership)
      socket = {message: membership, type: 'membership'}
      ChatDirect.broadcast_to(direct.id, socket)
  end
end