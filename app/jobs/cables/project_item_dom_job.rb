module Cables
  class ProjectItemDomJob < ApplicationJob
    def perform(message)
      ActionCable.server.broadcast(
        "messages:#{message.id}",
        id: message.id,
        html: render_message(message)
      )
    end
    private
    def render_message(message)
      ApplicationController.render(
        partial: 'messages/message',
        locals: { message: message }
      )
    end
  end
end